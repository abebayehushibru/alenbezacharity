import express from 'express';
import {getDashboardData, updateUserRole} from '../controllers/adminController.js';


const adminRoutes = express.Router();
adminRoutes.get('/dashboard',getDashboardData)
adminRoutes.post('/updateRole',updateUserRole)
export default  adminRoutes;