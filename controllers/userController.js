// controllers/userController.js
import User, { Gift } from '../models/Users.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initiateChapaPayment } from '../services/paymenyServices.js';
import MonthlyPayment from '../models/MonthlyPayment.js';
import { createTransaction } from '../utils/functions.js';

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
console.log(req.body);

   await newUser.save();
  // Check if user exists
  const user = await User.findOne({ phonenumber });
    // Generate JWT Token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

 
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
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', user: {token,firstname:user.firstname,lastname:user.lastname,email:user.firstname,phonenumber:user.phonenumber,role:user.role,id:user.customId},success:true });
  } catch (error) {
    res.status(500).json({ message: error.message,success:false });
  }
};
// Route to get all users
export const getAllUsers = async (req, res) => {
  try {
    console.log("Fetching users...");

    // Fetch users with selected fields and concatenate firstname and lastname as 'name'
    // const users = await User.find().lean(); // `.lean()` to get plain JavaScript objects instead of Mongoose documents
    const users = await User.find(); // Fetch all users
    // res.status(200).json(users);
    // Concatenate firstname and lastname to form 'name'
    const formattedUsers = await users.map(user => ({
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      role: user.role,
      id: user.customId,
      unique_id: user.id,
      phonenumber: user.phonenumber,
      monthlyamount:user.monthlyamount
    }));

   
console.log(formattedUsers);

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
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error: error.message });
  }
};




// // Controller to get all gifts
//  const getAllGifts = async (req, res) => {
//   try {
//     const gifts = await Gift.find({});
//     res.status(200).json(gifts);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching gifts', error });
//   }
// };

// // Controller to update gift status - for material gifts only
//  const updateGiftStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body; // Expected status from request body

//   try {
//     const gift = await Gift.findById(id);
//     if (!gift) return res.status(404).json({ message: 'Gift not found' });

//     if (gift.typeOfGift !== 'material') {
//       return res.status(400).json({ message: 'Status update is allowed only for material gifts' });
//     }

//     gift.status = status; // Update the gift status
//     await gift.save();
//     res.status(200).json({ message: 'Gift status updated successfully', gift });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating gift status', error });
//   }
// };

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

