import mongoose from 'mongoose';


// Define the schema for Gift
const giftSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false, // Optional
  },
  reasonForGift: {
    type: String,
    required: false, // Optional
  },
  address: {
    type: String,
    required: false, // Optional
  },
  typeOfGift: {
    type: String,
    enum: ['material', 'money'],
    required: true,
  },
  materialName: {
    type: String,
    required: function() {
      return this.typeOfGift === 'material';
    },
  },
  amount: {
    type: Number,
    required: function() {
      return this.typeOfGift === 'money';
    },
  },
  paymentMethod: {
    type: String,
    required: function() {
      return this.typeOfGift === 'money';
    },
  },
  giftRecipient: {
    type: String,
    enum: ['charity', 'child', 'childFamily'],
    required: true,
  },
  selectedChild: {
    type: String,
    required: function() {
      return this.giftRecipient === 'child' || this.giftRecipient === 'childFamily';
    },
  },
  transactionId: {
    type: String,
    required: false, // Optional; add after payment is successful
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the model
const Gift = mongoose.model('Gift', giftSchema);

export default Gift;
