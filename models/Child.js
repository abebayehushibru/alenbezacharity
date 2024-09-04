import  mongoose  from 'mongoose';
const Schema = mongoose.Schema;

// Define the schema for Child
const childSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: false, // Optional
  },
  grade: {
    type: String,
    required: true, // Can be adjusted to include validation for grades if needed
  },
  hobbies: {
    type: [String], // Array of strings to hold multiple hobbies
    required: false, // Optional
  },
  favoriteSubject: {
    type: String,
    required: false, // Optional
  },
  enteryYear: {
    type: String,
    required: true, // Optional
  },
  enrolledDate: {
    type: Date,
    required: true,
    default: Date.now, // Automatically sets to the current date
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Create the model
const Child = mongoose.model('Child', childSchema);

export default Child;
