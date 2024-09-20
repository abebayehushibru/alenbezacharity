import express from 'express';
import {getDashboardData, getTransactions, updateUserRole} from '../controllers/adminController.js';
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const adminRoutes = express.Router();
adminRoutes.get('/dashboard',authMiddleware,roleMiddleware(["Finance-controller","superadmin","Content-manager",]),getDashboardData)
adminRoutes.get('/transactions',authMiddleware,roleMiddleware(["Finance-controller","superadmin",]),getTransactions)
adminRoutes.post('/updateRole',authMiddleware,roleMiddleware(["superadmin"]),updateUserRole)
export default  adminRoutes;