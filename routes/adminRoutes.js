import express from 'express';
import getDashbordData from '../controllers/adminController.js';


const adminRoutes = express.Router();
adminRoutes.get('/dashboard',getDashbordData)
export default  adminRoutes;