import mongoose from 'mongoose';

// Define the user schema with the customId field
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: false,unique:false},
  password: { type: String, required: true },
  address: { type: String, required: false },
  role: { type: String, default: 'member' },
  phonenumber: { type: String, required: true, unique: true },
  monthlyamount: { type: Number, required: true },
  createdate: { type: String, required: true },
  customId: { type: String, unique: true }, // Custom ID field
});

// Pre-save hook to generate the custom ID
userSchema.pre('save', async function (next) {
  if (!this.customId) {
    // Get the last two digits of the current year
    const entryYear = new Date().getFullYear().toString().slice(-2);

    // Find the last user based on customId in descending order
    const lastUser = await mongoose
      .model('User', userSchema)
      .findOne({})
      .sort({ customId: -1 })
      .exec();

    // Extract the number part from the last custom ID
    let number = 10; // Start from 10 if no previous users are found
    if (lastUser && lastUser.customId) {
      const match = lastUser.customId.match(/ABC\/(\d{4})\//);
      if (match) {
        number = parseInt(match[1], 10) + 1; // Increment the last number by 1
      }
    }

    // Generate the custom ID in the format ABC/4-digit-number/last-2-digits-of-entry-year
    this.customId = `ABC/${number.toString().padStart(4, '0')}/${entryYear}`;
  }
  next();
});

// Middleware to check if email is unique before saving a new user
userSchema.pre('save', async function (next) {
  if (this.email) {
    const existingUser = await mongoose.models.User.findOne({ email: this.email });
    if (existingUser && existingUser._id.toString() !== this._id.toString()) {
      // If an existing user is found with the same email but a different ID
      return next(new Error('Email must be unique.'));
    }
  }
  next();
});

// Middleware to check if email is unique before updating an existing user
userSchema.pre('updateOne', async function (next) {
  const update = this.getUpdate();
  if (update.$set && update.$set.email) {
    const existingUser = await mongoose.models.User.findOne({ email: update.$set.email });
    if (existingUser && existingUser._id.toString() !== this.getQuery()._id.toString()) {
      return next(new Error('Email must be unique.'));
    }
  }
  next();
});

// Create the User model
const User = mongoose.model('User', userSchema);
export default User;

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

export  {Gift};