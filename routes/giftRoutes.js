import express from 'express';
// import { processGift } from '../controllers/Controller.js';

// import  { isAdmin } from '../middlewares/authMiddleware'; // Assuming there's a middleware to check if the user is an a
const giftRoutes = express.Router();

// Route to get all gifts - accessible by admin only
//  giftRoutes.get('/all', getAllGifts);

// // // Route to update the status of a material gift - accessible by admin only
// // giftRoutes.patch('/update-status/:id', isAdmin, updateGiftStatus);

// // Route to process a gift (material or money)
// giftRoutes.post('/process', processGift);


export default  giftRoutes;
