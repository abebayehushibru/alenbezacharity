// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gifts from './models/Gift.js';
import MonthlyPaymentHistory from './models/MonthlPaymentHistory.js';
import Transaction from './models/Transaction.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Gifts.deleteMany({});
    console.log('All data from Gifts collection has been deleted.');

    // Delete all data from MonthlyPaymentHistory collection
    await MonthlyPaymentHistory.deleteMany({});
    console.log('All data from MonthlyPaymentHistory collection has been deleted.');

    // Delete all data from Transaction collection
    await Transaction.deleteMany({});
    console.log('All data from Transaction collection has been deleted.');
  console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// import Child from './models/Child.js'; // Adjust the path as needed


// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('Error connecting to MongoDB:', error));

// // Default data for the Child model
// const childrenData = [
//   { firstName: 'Pinel', lastName: 'Arega', grade: '4th', enteryYear: '2011' },
//   { firstName: 'Rahimet', lastName: 'Abdu', grade: '3rd', enteryYear: '2012' },
//   { firstName: 'Teketel', lastName: 'Alemu', grade: '3rd', enteryYear: '2012' },
//   { firstName: 'Nazret', lastName: 'Shifera', grade: '6th', enteryYear: '2013' },
//   { firstName: 'Getayawkal', lastName: 'Gutu', grade: '3rd', enteryYear: '2011' },
//   { firstName: 'Wubalem', lastName: 'Yohanis', grade: '3rd', enteryYear: '2012' },
//   { firstName: 'Muluken', lastName: 'Alemayehu', grade: '3rd', enteryYear: '2011' },
//   { firstName: 'Frikos', lastName: 'Temesgen', grade: '3rd', enteryYear: '2012' },
//   { firstName: 'Mesafnt', lastName: 'Mariam', grade: '3rd', enteryYear: '2012' },
// ];

// // Function to seed the database
// const seedDatabase = async () => {
//   try {
//     // Clear the existing data
//     const existingChildren = await Child.countDocuments();
    
//     if (existingChildren === 0) {
//     console.log('Existing data cleared.');

//     // Insert the new data
//     await Child.insertMany(childrenData);
//     await seedAdmin();
//     console.log('Default data inserted successfully.');}

//   } catch (error) {
//     console.error('Error seeding the database:', error);
  
//   }
// };
// // Admin user details
// const adminData = {
//   firstname: 'Abebayehu',
//   lastname: 'Shibru',
//   email: 'abeaba64@gmail.com',
//   password: '228742;Ab',
//   role: 'admin', // Set the role to admin
//   phonenumber: '0964799523',
//   monthlyamount: 30,
//   createdate: new Date().toISOString(), // Set the current date
//   customId: 'admin001', // Custom ID, adjust as needed
// };
// // Function to seed the admin user
// const seedAdmin = async () => {
//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(adminData.password, 10);
//     adminData.password = hashedPassword;

//     // Check if the admin user already exists by email or phone number
// const existingAdmin = await User.findOne({
//   $or: [
//     { email: adminData.email },
//     { phonenumber: adminData.phonenumber }
//   ]
// });

//     if (existingAdmin) {
//       console.log('Admin user already exists.');
//     } else {
//       // Insert the admin user
//       await User.create(adminData);
//       console.log('Admin user inserted successfully.');
//     }

//   } catch (error) {
//     console.error('Error seeding the admin user:', error);

//   }
// };
// // Run the seed function
// seedDatabase();


export default connectDB;
