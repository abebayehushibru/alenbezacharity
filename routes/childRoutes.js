import express from 'express';
import { addChild, editChild, getAllChildren } from '../controllers/childController.js';
const childRoutes=express.Router()
// Route to get all children
childRoutes.get('/', getAllChildren);

// Route to add a new child
childRoutes.post('/add', addChild);

// Route to edit an existing child
childRoutes.put('/edit/:id', editChild);

export default childRoutes;