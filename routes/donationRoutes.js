import express from 'express';
import { addMonthlyPayment, getGiftById, getGifts, getMyDonationByUserId, processGift, processMonthlyPayment, updateGiftStatus } from '../controllers/donationController.js';

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
// Update the path as necessar
const donationRoutes = express.Router();
donationRoutes.post('donations/monthly', processMonthlyPayment);
donationRoutes.post('/gifts', processGift);
donationRoutes.get('/gifts',authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), getGifts);
donationRoutes.get("/gifts/:id",authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), getGiftById)
donationRoutes.post("/gifts/:id/status",authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), updateGiftStatus);
donationRoutes.post('/addMonthlyDonation', authMiddleware,roleMiddleware(["Finance-controller","superadmin"]),addMonthlyPayment);
donationRoutes.get('/getMyDonation', authMiddleware, getMyDonationByUserId);
export default donationRoutes;