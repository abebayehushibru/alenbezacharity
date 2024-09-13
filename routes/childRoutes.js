import express from 'express';
import { addChild, deleteChild, editChild, getAllChildren, getChildById } from '../controllers/childController.js';
const childRoutes=express.Router()
// Route to get all children

childRoutes.get('/', getAllChildren);
// get child by id 
childRoutes.get('/:id', getChildById);
// Route to add a new child
childRoutes.post('/add', addChild);
// Route to delete a child
childRoutes.delete('/delete/:id', deleteChild);

// Route to edit an existing child
childRoutes.post('/edit/:id', editChild);

export default childRoutes;