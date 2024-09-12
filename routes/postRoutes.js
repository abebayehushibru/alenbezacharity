import express from 'express';
// Update the path as necessary
import multer from 'multer';

import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controllers/postController.js';

const postRoutes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
postRoutes.get('/',  getPosts);
postRoutes.get('/:id', getPostById)
postRoutes.post('/add', upload.array('images'), createPost);
postRoutes.delete('/delete/:id', deletePost);
postRoutes.patch('/update/:id', updatePost);
export default postRoutes;