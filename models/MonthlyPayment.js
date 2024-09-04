import mongoose from 'mongoose';
import getCurrentEthiopianYear from '../utils/ethiopianYear.js';


const Schema = mongoose.Schema;

// Define the schema for MonthlyPayment
const monthlyPaymentSchema = new Schema({
  customId: {
    type: String,
    required: true,
    unique: true, // Ensure customId is unique
  },
  amount: {
    type: Number,
    required: true,
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
const MonthlyPayment = mongoose.model('MonthlyPayment', monthlyPaymentSchema);

export  default MonthlyPayment;
