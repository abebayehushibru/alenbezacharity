import express from 'express';
import {getDashbordData, updateUserRole} from '../controllers/adminController.js';


const adminRoutes = express.Router();
adminRoutes.get('/dashboard',getDashbordData)
adminRoutes.post('/updateRole',updateUserRole)
export default  adminRoutes;