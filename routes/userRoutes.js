// routes/userRoutes.js
import express from 'express';
import { createUser, findUserByCustomId, getAllUsers, getMemeberById, getProfile, loginUser, processGift, processMonthlyPayment, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
// import authMiddleware from '../middleware/authMiddleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', createUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/findById/:id', getMemeberById);
userRoutes.post('/findUserById', findUserByCustomId); // Protected route
userRoutes.get('/all', getAllUsers);
userRoutes.post('/process', processGift);
userRoutes.post('/monthlydonation', processMonthlyPayment);
userRoutes.get('/profile', authMiddleware, getProfile);
userRoutes.post('/profile', authMiddleware, updateProfile);
// router.put('/:id', authMiddleware, updateUser); // Protected route
// router.delete('/:id', authMiddleware, deleteUser); // Protected route

export default  userRoutes;
