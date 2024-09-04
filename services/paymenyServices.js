import { Chapa } from "chapa-nodejs";
import axios from 'axios';
const chapa = new Chapa({
  secretKey: "CHASECK_TEST-Ol26cu3s2lNPUx5XO5gj6YqK5ldY0GAf",
});
export const initiateTelebirrPayment = async (gift) => {
  // Example: Make an API request to Telebirr to initiate payment
  try {
    // Replace with actual Telebirr API request
    const response = await axios.post(
      "https://telebirr-payment-api.com/initiate",
      {
        amount: gift.amount,
        phoneNumber: gift.phoneNumber,
        transactionId: gift._id,
      }
    );

    // Extract the payment link from Telebirr response
    const paymentLink = response.data.paymentLink;
    return paymentLink;
  } catch (error) {
    throw new Error("Error initiating Telebirr payment");
  }
};

export const initiateChapaPayment = async (data) => {
  console.log(data);

 

  try {

    const paymentData = {
      first_name: data.firstname,
      last_name: data.lastname,
  
      currency: 'ETB',
      amount: data.amount, // Ensure amount is a string
      tx_ref: data.transactionId,
      callback_url: 'https://your-callback-url.com/', // Replace with your callback URL
      return_url: 'https://your-return-url.com/', // Replace with your return URL
      customization: {
        title: 'charity donation',
        description: 'Thanks for your gift',
      },
    };

    // Configure Axios request headers
    const config = {
      headers: {
        Authorization: `Bearer CHASECK_TEST-Ol26cu3s2lNPUx5XO5gj6YqK5ldY0GAf`, // Authorization header with Bearer token
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize', // Chapa's payment initiation endpoint
      paymentData,
      config
    );
console.log(response.data.data);

    // Extract the payment link from Chapa response
    const paymentLink = response.data.data;
    return paymentLink;
  } catch (error) {
    console.error("Error details 1:", JSON.stringify(error));
    console.error("Error details:", error.response.data);
    res.status(500).json({ message: 'Error processing payment', error });
  }
};
