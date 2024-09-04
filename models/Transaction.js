import mongoose from 'mongoose';


const Schema = mongoose.Schema;

// Define the schema for Transaction
const transactionSchema = new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true, // Ensure transactionId is unique
  },
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'ETB', // Default currency if applicable
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    required: true,
    default:"pending"
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  isGift: {
    type: Boolean,
    required: false, 
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the timestamp
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the model
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
