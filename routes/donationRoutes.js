import express from 'express';
import { processGift, processMonthlyPayment } from '../controllers/donationController.js';
// Update the path as necessar
const donationRoutes = express.Router();

// donationRoutes.get('/',  getPosts);
// donationRoutes.get('/:id', getPostById)
donationRoutes.post('/monthly', processMonthlyPayment);
donationRoutes.post('/gifts', processGift);

export default donationRoutes;