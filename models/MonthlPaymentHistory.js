import mongoose from 'mongoose';
import getCurrentEthiopianYear from '../utils/ethiopianYear.js';

const Schema = mongoose.Schema;

// Define the schema for MonthlyPayment
const MonthlyPaymentHistorySchema = new Schema({
  customId: {
    type: String,
    required: true,
    unique: true, // Ensure customId is unique
  },
  amount: {
    type: Number,
    required: true,
  },
  monthlyAmount: { // Retain this field if needed
    type: Number,
    required: true,
    default: 25,
  },
  year: {
    type: String,
    required: true,
    default: getCurrentEthiopianYear, // Set default to current Ethiopian year
    enum: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'], // Add more years as needed
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the model
const MonthlyPaymentHistory = mongoose.model('MonthlyPaymentHistory', MonthlyPaymentHistorySchema);

export default MonthlyPaymentHistory;
