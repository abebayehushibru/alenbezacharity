import express from 'express';
import { addChild, editChild, getAllChildren, getChildById } from '../controllers/childController.js';
const childRoutes=express.Router()
// Route to get all children

childRoutes.get('/', getAllChildren);
// get child by id 
childRoutes.get('/:id', getChildById);
// Route to add a new child
childRoutes.post('/add', addChild);

// Route to edit an existing child
childRoutes.put('/edit/:id', editChild);

export default childRoutes;