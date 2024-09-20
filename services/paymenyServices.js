import { Chapa } from "chapa-nodejs";
import axios from 'axios';
const secretKey= "CHASECK_TEST-Ol26cu3s2lNPUx5XO5gj6YqK5ldY0GAf";

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

  try {

    const paymentData = {
      first_name: data.firstname,
      last_name: data.lastname,
      currency: 'ETB',
      amount: data.amount, // Ensure amount is a string
      tx_ref: `${data.transactionId}-${data.customId}-${data.donationType}`,
      callback_url: 'https://alenbezacharity.onrender.com/donations/verify', // Replace with your callback URL
      return_url: 'http://alenbezacharity.netlify.app/', // Replace with your return URL
      customization: {
        title: 'charity donation',
        description: 'Thanks for your gift',
      },
    };


    // Configure Axios request headers
    const config = {
      headers: {
        Authorization: `Bearer `+secretKey, // Authorization header with Bearer token
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize', // Chapa's payment initiation endpoint
      paymentData,
      config
    );

    // Extract the payment link from Chapa response
    const paymentLink = response.data.data;
    return paymentLink;
  } catch (error) {
    console.error("Error details 1:", JSON.stringify(error));
    console.error("Error details:", error.response.data);
 
  }
};

export const  verifyTransaction = async (transactionId) => {
  const options = {
    method: 'GET',
    url: `https://api.chapa.co/v1/transaction/verify/${transactionId}`,
    headers: {
      'Authorization': `Bearer `+secretKey,
    }
  };

  try {
    const response = await axios(options);
   return response.data; // Handle the response data as needed
  } catch (error) {

    console.error('Error verifying transaction:', error.response ? error.response.data : error.message);
    throw new Error('Verification failed');
  }
};


