import express from 'express';
// Update the path as necessary
import multer from 'multer';

import { createComment, createPost, deleteComment, deletePost, getAllPosts, getPostById, getPosts, updatePost } from '../controllers/postController.js';

const postRoutes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
postRoutes.get('/',  getAllPosts);
postRoutes.get('/bypage',  getPosts);
postRoutes.get('/:id', getPostById)
postRoutes.post('/add', upload.array('images'), createPost);
postRoutes.delete('/delete/:id', deletePost);
postRoutes.post('/update/:id', updatePost);
postRoutes.post('/comment', createComment);
postRoutes.delete('/comment/delete/:id', deleteComment);
export default postRoutes;