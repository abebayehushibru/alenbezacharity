// controllers/paymentController.js
import axios from "axios";
import Transaction from "../models/Transaction.js"; // Ensure correct path to your model
import { initiateChapaPayment } from "../services/paymenyServices.js";
import User from "../models/Users.js";

// Example Express.js handler for Chapa callback
export const chapaCallbackHandler = async (req, res) => {
  try {
    // Extract tx_ref from the callback data
    const { tx_ref, status } = req.body;

    // Split the tx_ref to get the transaction ID and customId
    const [transactionId, customId, donationType] = tx_ref.split("-");

    // Check the payment status
    if (status === "success") {
      // Use customId for further processing, like updating the payment record
      console.log(`Payment successful for customId: ${customId}`);
      // Here, you can call your function to update payment records using the customId
      // Example: await handleMonthlyPayment(customId, newAmount);

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
  console.log(req.body);
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
