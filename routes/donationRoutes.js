import express from 'express';
import { addMonthlyPayment, getGiftById, getGifts, getMyDonationByUserId, processGift, processMonthlyPayment, updateGiftStatus } from '../controllers/donationController.js';
import authMiddleware from '../middleware/authMiddleware.js';
// Update the path as necessar
const donationRoutes = express.Router();
donationRoutes.post('/monthly', processMonthlyPayment);
donationRoutes.post('/gifts', processGift);
donationRoutes.get('/gifts', getGifts);
donationRoutes.get("/gifts/:id", getGiftById)
donationRoutes.post("/gifts/:id/status", updateGiftStatus);
donationRoutes.post('/addMonthlyDonation', addMonthlyPayment);
donationRoutes.get('/getMyDonation', authMiddleware, getMyDonationByUserId);
export default donationRoutes;