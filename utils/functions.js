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
// Function to generate random 8-character password
const generateRandomPassword=()=> {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

 
  

export {createTransaction,generateRandomPassword}
