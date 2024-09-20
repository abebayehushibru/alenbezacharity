// controllers/userController.js
import User, { Gift } from '../models/Users.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initiateChapaPayment } from '../services/paymenyServices.js';

import { createTransaction } from '../utils/functions.js';
import MonthlyPaymentHistory from '../models/MonthlPaymentHistory.js';
import getCurrentEthiopianYear from '../utils/ethiopianYear.js';
import { generateHtmlTemplate } from '../utils/emailHtmls.js';
import sendMail from '../utils/sendMail.js';
import Transaction from '../models/Transaction.js';
import Gifts from '../models/Gift.js';

// Register User
export const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phonenumber, monthlyamount, createdate,address } = req.body;
    const query = [];
    if (!phonenumber) {
      return res.status(400).json({ message: 'Phoen number is required.' });
    }
    if (email) query.push({ email });
    if (phonenumber) query.push({ phonenumber });
    // Check if email or phone number already exists
    const existingUser = await User.findOne({ $or: query});
    if (existingUser) {
      const errorMessage =
        existingUser.email === email
          ? 'Email already registered'
          : 'Phone number already registered';
      return res.status(400).json({ message: errorMessage });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      address,
      password: hashedPassword,
      phonenumber,
      monthlyamount,
      createdate,
    });


   await newUser.save();
  // Check if user exists
  const user = await User.findOne({ phonenumber });
    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '90d', // Set token expiration to 30 days
    });
    const message=`<p>Full  Name  : ${firstname} ${lastname}</p>
                   <p>Phone Number  : ${phonenumber} </p>
                   <p>Email  : ${email}</p>
                   <p>Address : ${address} </p>
                   <p>Monthly amount : ${monthlyamount} </p>
                 `
    const mailOptions = {
      from: email, // The sender's email
      to: "abeaba64@gmail.com", // Your charity email
      subject: `New member registerd ${firstname}  ${lastname}`,
      html: generateHtmlTemplate("template1",{from_name:firstname,from_email:email,message,phonenumber}),
    };
    await sendMail(mailOptions);
    res.status(200).json({ message: 'Registerd successful', user: {token,firstname:user.firstname,lastname:user.lastname,email:user.firstname,phonenumber:user.phonenumber,role:"Member",id:user.customId},success:true });
  } catch (error) {
    res.status(400).json({ message: error.message ,success:false});
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;


    // Check if user exists
    const user = await User.findOne({ phonenumber:phone });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Phone number or Password phone' ,success:false});
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Phone number or Password ',success:false });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '90d', // Set token expiration to 30 days
    });

    res.status(200).json({ message: 'Login successful', user: {token,firstname:user.firstname,lastname:user.lastname,email:user.firstname,phonenumber:user.phonenumber,role:user.role,id:user.customId},success:true });
  } catch (error) {
    res.status(500).json({ message: error.message,success:false });
  }
};
// Route to get all users
export const getAllUsers = async (req, res) => {
  const year = req.query.selectedYear || getCurrentEthiopianYear();
  try {
 
     const users = await User.find(); // Fetch all users
   
     const formattedUsers = await Promise.all(users.map(async (user) => {
      // Find all monthly payments for the user for the given year
      const monthlyPayments = await MonthlyPaymentHistory.find({ 
        customId: user.customId, 
        year: year 
      });
      const totalAmount = monthlyPayments[0]?.amount|| 0;
  
      return {
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        role: user.role,
        id: user.customId,
        unique_id: user.id,
        phonenumber: user.phonenumber,
        monthlyamount: user.monthlyamount,
         status : Math.floor(totalAmount / user.monthlyamount) // Include the total amount from monthly payments
      };
    }));

   


    res.status(200).json(formattedUsers); // Send the formatted users as a JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};

// find user by custom id
export const findUserByCustomId = async (req, res) => {
  try {
    const { customId } = req.body;


    // Validate customId format
    if (!/^ABC\/\d{4}\/\d{2}$/.test(customId)) {
      return res.status(400).json({ message: 'Invalid member Id format', success: false });
    }
    // Find user by customId
    const user = await User.findOne({ customId });

    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    // Respond with user data
    res.status(200).json({
      message: 'User found',
      user: {
        id: user.customId,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
// find user by custom id
export const getMemeberById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { phonenumber } = user;
    // Get top 5 recent transactions for this user that are not gifts
    const transactions = await Transaction.find({ phoneNumber:phonenumber, isGift: { $ne: true } ,status:"completed"})
      .sort({ createdAt: -1 }) // Sort by most recent
      .limit(5);

             // Format the transaction results
    const formattedTransactions = transactions.map((transaction) => ({
      id: transaction._id,
      name: `${user.firstname} ${user.lastname}`,
      phoneNumber: transaction.phoneNumber,
      amount: transaction.amount,
      status: transaction.status,
      date: transaction.createdAt,
      typeOfGift: null, // Transactions are not gifts, so typeOfGift is null
    }));

   

    // Merge and return the results and sort 
    const results =formattedTransactions
    res.status(200).json({user,donations:results});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
};
export const getProfile =async (req, res) => {

  try {
   
    
    const user = await User.findOne({ _id: req.user.id }).select(
      'firstname lastname email phonenumber monthlyamount customId createdate address role'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const monthlyPayments = await MonthlyPaymentHistory.find({ customId: user.customId, year:getCurrentEthiopianYear()});
    let canEdit= false
 console.log(monthlyPayments);
 
    if(!monthlyPayments.length>0){
      canEdit= true;
      console.log("monthlyPayments");
    }
    else if(monthlyPayments[0].amount/monthlyPayments[0].monthlyAmount >=12|| monthlyPayments[0].amount/monthlyPayments[0].monthlyAmount ==0){
      canEdit= true
      console.log("monthlyPayments 2");
    }
 
    res.json({user,canEdit});
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile =async (req, res) => {
  try {
    // Extract user ID from token
    const userId = req.user.id;

    // Extract fields from request body
    const { firstname, lastname, phonenumber, email, monthlyamount, address } = req.body;

    // Validate incoming data (you can add more specific validations)
    if (!firstname || !lastname || !phonenumber || !email || !monthlyamount) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstname, lastname, phonenumber, email, monthlyamount, address },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Send back the updated user data
    res.json({ message: 'Profile updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
}

export const updateProfileByAdmin =async (req, res) => {
  try {
    
    // Extract fields from request body
    const {_id ,firstname, lastname, phonenumber, email, monthlyamount, address } = req.body;

    // Validate incoming data (you can add more specific validations)
    if (!firstname || !lastname || !phonenumber || !email || !monthlyamount) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { firstname, lastname, phonenumber, email, monthlyamount, address },
      { new: true } // Return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Send back the updated user data
    res.json({ message: 'Profile updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
}

export const sendContactEmail = async (req, res) => {
  const { name, email, phone, userType, message } = req.body;

  if (!name || !email || !phone || !userType || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const mailOptions = {
    from: email, // The sender's email
    to: "abeaba64@gmail.com", // Your charity email
    subject: `New Contact Message from ${name} and User Type  ${userType}`,
    html: generateHtmlTemplate("template2",{from_name:name,from_email:email,message,phone}),
  };

  try {
    // Send the email
await sendMail(mailOptions);
    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send the message.' });
  }
};




// Controller to process a gift (material or money)
 export const processGift = async (req, res) => {
   
   
   const {paymentMethod, firstname, lastname, phonenumber, email, reasonForGift, address, typeofGift, materialName, amount, giftRecipient, selectedChild } = req.body;
   // Generate a unique transaction ID
  const transactionId = `TRX_${Date.now()}`;
console.log(req.body);

  try {
    // Create a new gift
    const gift = new Gift({
      firstName:firstname,
      lastName:lastname,
      phoneNumber:phonenumber,
      email,
      reasonForGift,
      address,
      typeOfGift:typeofGift,
      materialName: typeofGift === 'material' ? materialName : undefined,
      amount: typeofGift === 'money' ? amount : undefined,
      paymentMethod: typeofGift === 'money' ? paymentMethod : undefined,
      transactionId: typeofGift === 'money' ?transactionId:undefined,
      giftRecipient,
      selectedChild: giftRecipient !== 'charity' ? selectedChild : undefined,
    });


    // // If the gift is material, save it to the database directly
    if (typeofGift === 'material') {
      await gift.save();
      return res.status(201).json({ message: 'Material gift registered successfully', gift });
    }

    // // If the gift is money, initiate payment process
  await gift.save();
    
     let paymentLink;

   if (paymentMethod === 'telebirr') {
      // Send request to initiate Telebirr payment and get the payment link
      paymentLink = await initiateTelebirrPayment(gift);
    } else  {
      // Send request to initiate Chapa payment and get the payment link
      paymentLink = await initiateChapaPayment({
        firstname,
        lastname,
        amount,
        transactionId
      });
    }
 
    res.status(200).json({ message: 'Payment initiation successful', paymentLink });
  } catch (error) {
    console.error("Error details 1:", error);
   
    res.status(500).json({ message: 'Error processing gift 3', error });
  }
};
export const processMonthlyPayment = async (req, res) => {
  const {paymentMethod, firstname, lastname, phonenumber  } = req.body;
  // Generate a unique transaction ID
  const transactionId = `TRX_${Date.now()}`;
 console.log(req.body);
 
  try {
   
 const createdTX=  await createTransaction({
      transactionId,
      amount: 100,
      name: firstname  +' ' + lastname,
      phoneNumber: phonenumber,
      currency: 'ETB',
      status: 'pending',
      paymentMethod,
      isGift: false, // Optional: include if applicable
    })
  console.log(createdTX);
    
   
    let paymentLink ;
  
   if (paymentMethod === 'telebirr') {
      // Send request to initiate Telebirr payment and get the payment link
 paymentLink = await initiateTelebirrPayment({});
  } else {
      // Send request to initiate Chapa payment and get the payment link
       paymentLink = await initiateChapaPayment({...req.body,transactionId});
  
    }


    res.status(200).json({ message: 'Payment initiation successful', paymentLink });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error });
  }
};

