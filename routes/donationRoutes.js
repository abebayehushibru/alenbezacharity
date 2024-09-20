import express from 'express';
import { addMonthlyPayment, chapaCallbackHandler, getGiftById, getGifts, getMyDonationByUserId, getMyDonationFormBot, processGift, processMonthlyPayment, updateGiftStatus } from '../controllers/donationController.js';

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const donationRoutes = express.Router();
donationRoutes.post('donations/monthly', processMonthlyPayment);
donationRoutes.post('/gifts', processGift);
donationRoutes.get('/gifts',authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), getGifts);
donationRoutes.get("/gifts/:id",authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), getGiftById)
donationRoutes.post("/gifts/:id/status",authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), updateGiftStatus);
donationRoutes.post('/addMonthlyDonation', authMiddleware,roleMiddleware(["Finance-controller","superadmin"]),addMonthlyPayment);
donationRoutes.get('/getMyDonation', authMiddleware, getMyDonationByUserId);
donationRoutes.get('/verify', chapaCallbackHandler);
donationRoutes.get('/getMyDonationFormBot', getMyDonationFormBot);
export default donationRoutes;