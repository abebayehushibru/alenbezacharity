// controllers/paymentController.js
import axios from "axios";
import Transaction from "../models/Transaction.js"; // Ensure correct path to your model
import { initiateChapaPayment, verifyTransaction } from "../services/paymenyServices.js";
import User from "../models/Users.js";
import getCurrentEthiopianYear, { getCurrentEthiopianMonth } from "../utils/ethiopianYear.js";
import MonthlyPaymentHistory from "../models/MonthlPaymentHistory.js";
import Gift from "../models/Gift.js";




export const chapaCallbackHandler = async (req, res) => {
  try {
    // Extract tx_ref from the callback data
    const { tx_ref } = req.body;

    // Split the tx_ref to get the transaction ID and customId
    const [transactionId, customId, donationType] = tx_ref.split("-");

    // Verify the payment status
    const verifyResponse = await verifyTransaction(transactionId);

    // Check if the verification was successful
    if (verifyResponse.status === "success") {
      const {
        amount,
        currency,
        charge,
        first_name,
        last_name,
        email,
        created_at,
        updated_at,
      } = verifyResponse.data;

      // Register the transaction in the database without checking by ID
      await Transaction.create({
        transactionId, // Register the transaction ID
        amount, 
        currency, 
        charge,
        name: `${first_name} ${last_name}`, 
        email, 
        paymentMethod: "Chapa",
        status: 'completed',
        isGift:donationType === "gift",

       createdAt :created_at, 
       updatedAt:updated_at, 
      });
      // If it's a gift, update the gift status
      if (donationType === "gift") {
        await Gift.findOneAndUpdate(
          { transactionId }, // Find by transactionId
          { status: 'completed' }, // Update status to completed
          { new: true, upsert: true } // Create a new document if it doesn't exist
        );
        console.log(`Gift successful added`);
      res.status(200).json({ message: "Gift successful added" });
      }
      console.log(`Payment successful for customId: ${customId}`);
      res.status(200).json({ message: "Payment successful", customId });
      
    } else {
      res.status(400).json({ message: "Payment failed or incomplete" });
    }
  } catch (error) {
    console.error("Error handling Chapa callback:", error);
    res.status(500).json({ message: "Error handling payment callback" });
  }
};
export const processGift = async (req, res) => {
  const {
    paymentMethod,
    firstname,
    lastname,
    phonenumber,
    email,
    reasonForGift,
    address,
    typeofGift,
    materialName,
    amount,
    giftRecipient,
    selectedChild,
  } = req.body;
  // Generate a unique transaction ID
  const transactionId = `TRX_${Date.now()}`;
  console.log(req.body);

  try {
    // Create a new gift
    const gift = new Gift({
      firstName: firstname,
      lastName: lastname,
      phoneNumber: phonenumber,
      email,
      reasonForGift,
      address,
      typeOfGift: typeofGift,
      materialName: typeofGift === "material" ? materialName : undefined,
      amount: typeofGift === "money" ? amount : undefined,
      paymentMethod: typeofGift === "money" ? paymentMethod : undefined,
      transactionId: typeofGift === "money" ? transactionId : undefined,
      giftRecipient,
      selectedChild: giftRecipient !== "charity" ? selectedChild : undefined,
    });

    // // If the gift is material, save it to the database directly
    if (typeofGift === "material") {
      await gift.save();
      return res
        .status(201)
        .json({ message: "Material gift registered successfully", gift });
    }

    // // If the gift is money, initiate payment process
    await gift.save();

    let paymentLink = await initiateChapaPayment({
      firstname,
      lastname,
      amount,
      transactionId,
      donationType:"gift"
    });

    res
      .status(200)
      .json({ message: "Payment initiation successful", paymentLink });
  } catch (error) {
    console.error("Error details 1:", error);

    res.status(500).json({ message: "Error processing gift 3", error });
  }
};
export const processMonthlyPayment = async (req, res) => {
  const { firstname, lastname, phonenumber, memberId, amount } = req.body;
  // Generate a unique transaction ID
  const transactionId = `TRX_${Date.now()}`;
  // Validate customId format
  if (!/^ABC\/\d{4}\/\d{2}$/.test(memberId)) {
    return res
      .status(400)
      .json({ message: "Invalid member Id format", success: false });
  }
  // Find user by customId
  const user = await User.findOne({customId: memberId });

  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  try {
    let paymentLink;
    // Send request to initiate Chapa payment and get the payment link
    paymentLink = await initiateChapaPayment({
      firstname,
      lastname,
      phonenumber,
      customId: user._id,
      transactionId,
      donationType: "monthly",
      amount,
    });
    res
      .status(200)
      .json({ message: "Payment initiation successful", paymentLink });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error processing payment", error });
  }
};
// Function to handle the donation and save the transaction
export const addMonthlyPayment = async (req, res) => {

  try {
    // Destructure data from the request body
    const { customId, amount, name, phonenumber } = req.body;


    // Generate unique transaction ID
    const transactionId = `TRX_${Date.now()}`;

    // Create the transaction data
   

    // Get the current Ethiopian year
    const currentYear = getCurrentEthiopianYear();

    // Check if a monthly payment with the same customId and year already exists
    const existingMonthlyPayment = await MonthlyPaymentHistory.findOne(
      { customId, year: currentYear }
    );

    if (existingMonthlyPayment) {
      // If it exists, update the amount by adding the new donation amount
      existingMonthlyPayment.amount += amount;
      await existingMonthlyPayment.save();
    } else {
       // Find the user by customId
    const user = await User.findOne({ customId });
  
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
   
    
      // If it does not exist, create a new monthly payment
      const newMonthlyPayment = new MonthlyPaymentHistory({
        customId,
        amount,
        monthlyAmount:user.monthlyamount,
        year: currentYear,
      });

      // Save the new monthly payment in the database
      await newMonthlyPayment.save();
      const transaction = new Transaction({
        transactionId,
        amount,
        name,
        phoneNumber: phonenumber,
        currency: 'ETB', // Ethiopian currency
        status: 'completed',
        paymentMethod: 'manual',
        isGift: false,
      });
  
      // Save the transaction in the database
      await transaction.save();
    }
    const data =await MonthlyPaymentHistory.find()
    console.log(data);

    res.status(201).json({ message: 'Donation and transaction processed successfully.' });
  } catch (error) {
  
    console.error('Error processing donation:', error);
    res.status(500).json({ message: 'Failed to process donation. Please try again later.' });
  }
};
export const getMyDonationByUserId = async (req, res) => {
  try {
    const  userId = req.user.id;;



  
    // Fetch the user data by customId
    const user = await User.findOne({ _id:userId });
  // Fetch the monthly payment history for the given customId
  const monthlyPayment = await MonthlyPaymentHistory.findOne({ customId:user.customId });

    // If no user found, respond with an error
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Fetch all transactions using the user's phonenumber
    const transactions = await Transaction.find({ status: 'completed', phoneNumber: user.phonenumber });


    // Set amount and monthlyAmount, fetch monthlyAmount from user if not available in monthlyPayment
    const amount = monthlyPayment ? monthlyPayment.amount : 0;
    const monthlyAmount = monthlyPayment?.monthlyAmount || user.monthlyamount; // Fallback to user's monthlyamount if not in monthlyPayment

    // Get the current Ethiopian month as a number (1 - 12)
    const currentMonth = getCurrentEthiopianMonth();
    const totalMonthsPaid = Math.floor(amount / monthlyAmount); // Calculate the number of months fully paid

    // Define all the Ethiopian months
    const ethiopianMonths = [
      'መስከረም / September',
      'ጥቅምት / October',
      'ህዳር / November',
      'ታኅሳስ / December',
      'ጥር / January',
      'የካቲት / February',
      'መጋቢት / March',
      'ሚያዝያ / April',
      'ግንቦት / May',
      'ሰኔ / June',
      'ሐምሌ / July',
      'ነሐሴ / August',
    ];

    // Create the response rows with statuses based on the amount and current month
    const rows = ethiopianMonths.map((month, index) => {
      const monthIndex = index + 1; // Month index from 1 to 12

      let status;
      if (monthIndex <= totalMonthsPaid) {
        status = 'ተከፍሏል / Paid'; // Mark as Paid
      } else if (monthIndex === currentMonth) {
        status = 'አልተከፈለም / Unpaid'; // Mark as Unpaid for the current month
      } else if (monthIndex > currentMonth) {
        status = 'የሚከፈል / Pending'; // Mark as Pending for future months
      } else {
        status = 'አልተከፈለም / Unpaid'; // Unpaid for past unpaid months
      }

      return {
        id: monthIndex,
        month,
        status,
      };
    });

    // Determine the message based on current month and paid months
    const info={message:"",color:""};
    if (currentMonth <= totalMonthsPaid) {
      info.message = 'Thank you for paying on time!.\n ወራዊ ክፍያዎን በጊዜ ስለ ከፈሉ እናመሰናለን!';
      info.color = 'green';
    } else {
      info.message = 'Thank you for paying, and please pay '+Math.floor(currentMonth - totalMonthsPaid)+' unpaid months. \n ስለሚከፍሉ እናመሰግናለን፣ እባክዎን ያልተከፈሉትን የ'+Math.floor(currentMonth - totalMonthsPaid)+' ወር ይክፈሉ።';
      info.color = 'yellow';
    }

    // Prepare the final response with payment statuses, message, and transaction history
    const response = {
      paymentStatus: rows,
      info,
      transactions, // Include the list of transactions related to the user's phonenumber
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ message: 'Failed to retrieve payment history.' });
  }
}
export const getGifts = async (req, res) => {
  const { typeOfGift, year, status } = req.query;

  try {
    // Build the query object dynamically based on the provided parameters
    const query = {};

    // Add typeOfGift to the query if provided
    if (typeOfGift) {
      query.typeOfGift = typeOfGift;
    }

    // Add year to the query if provided
    if (year) {
      const startDate = new Date(`${year}-09-11T00:00:00.000Z`);
      const endDate = new Date(`${Number(year) + 1}-09-10T23:59:59.999Z`);
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    // Add status to the query if provided
    if (status) {
      query.status = status;
    }

    // Find gifts based on the constructed query
    const gifts = await Gift.find(query);

    res.status(200).json({ message: "Gifts retrieved successfully", gifts });
  } catch (error) {
    console.error("Error retrieving gifts:", error);
    res.status(500).json({ message: "Error retrieving gifts", error });
  }
};

// Get gift details by ID
export const getGiftById = async (req, res) => {
  const { id } = req.params;


  try {
    const gift = await Gift.findById(id);
    
    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }

    res.status(200).json({ gift });
  } catch (error) {
    console.error("Error fetching gift details:", error);
    res.status(500).json({ message: "Server error fetching gift details" });
  }
};

// Update gift status
export const updateGiftStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Status should be either 'Completed' or 'Failed'

  try {
    // Find the gift by ID
    const gift = await Gift.findById(id);

    if (!gift) {
      return res.status(404).json({ message: "Gift not found" });
    }

    // Only allow status updates if the current status is 'Pending'
    if (gift.status !== "pending") {
      return res.status(400).json({ message: "Gift status cannot be updated unless it is pending" });
    }

    // Update the gift's status
    gift.status = status;
    await gift.save();

    res.status(200).json({ message: `Gift status updated to ${status}`, gift });
  } catch (error) {
    console.error("Error updating gift status:", error);
    res.status(500).json({ message: "Server error updating gift status" });
  }
};
