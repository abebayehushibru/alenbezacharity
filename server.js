// server.js or index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js'; // Ensure .js extension
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import childRoutes from './routes/childRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import postRoutes from './routes/postRoutes.js';
import donationRoutes from './routes/donationRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'https://alenbezacharity.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allows sending cookies or authorization headers
  }));
  
connectDB();


app.use(express.json());

// Routes
app.use('/users', userRoutes); // Use user routes for all user-related endpoints
app.use('/posts', postRoutes);
app.use('/donations', donationRoutes);
app.use('/child', childRoutes);
app.use('/admin', adminRoutes);

// Routes




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
