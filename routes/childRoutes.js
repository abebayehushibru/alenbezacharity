import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { addChild, deleteChild, editChild, getAllChildren, getChildById } from '../controllers/childController.js';
const childRoutes=express.Router()
// Route to get all children

childRoutes.get('/',authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), getAllChildren);
// get child by id 
childRoutes.get('/:id',authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), getChildById);
// Route to add a new child
childRoutes.post('/add',authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), addChild);
// Route to delete a child
childRoutes.delete('/delete/:id',authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), deleteChild);

// Route to edit an existing child
childRoutes.post('/edit/:id',authMiddleware,roleMiddleware(["Finance-controller","superadmin"]), editChild);

export default childRoutes;