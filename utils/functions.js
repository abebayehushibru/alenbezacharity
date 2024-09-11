import Transaction from "../models/Transaction.js";

// Function to create and save a new transaction
async function createTransaction(transactionData) {
    try {
      // Create a new transaction instance with the provided data
      const newTransaction = new Transaction(transactionData);
      // Save the transaction to the database
      const savedTransaction = await newTransaction.save();
  
      return savedTransaction;
    } catch (error) {
      console.error('Error saving transaction:', error);
      throw error;
    }
  }


 
  

export {createTransaction}
