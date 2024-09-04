// controllers/paymentController.js
import axios from 'axios';
import Transaction from '../models/Transaction.js'; // Ensure correct path to your model

export const handleChapaCallback = async (req, res) => {
  try {
    const { tx_ref, status, transaction_id  } = req.body;

    // Find the corresponding transaction in the database
    const transaction = await Transaction.findOne({ transactionId: tx_ref });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Verify the transaction with Chapa (if needed)
    const verificationResponse = await axios.get(`https://api.chapa.dev/transaction/verify/${transaction_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`, // Your Chapa secret key
      },
    });

    if (verificationResponse.data.status !== 'success') {
      return res.status(400).json({ message: 'Transaction verification failed' });
    }

    // Update transaction status in the database
    transaction.status = status;
    await transaction.save();

    // Respond to Chapa with a success message
    res.status(200).json({ message: 'Callback processed successfully' });
  } catch (error) {
    console.error('Error processing callback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
