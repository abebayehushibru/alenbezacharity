import express from 'express';
// Update the path as necessary
import multer from 'multer';
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import { createComment, createPost, deleteComment, deletePost, getAllPosts, getPostById, getPosts, updatePost } from '../controllers/postController.js';

const postRoutes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
postRoutes.get('posts/',authMiddleware,roleMiddleware(["Content-manager","superadmin"]), getAllPosts);
postRoutes.get('/bypage',  getPosts);
postRoutes.get('/:id', getPostById)
postRoutes.post('/add',authMiddleware,roleMiddleware(["Content-manager","superadmin"]), upload.array('images'), createPost);
postRoutes.delete('/delete/:id',authMiddleware,roleMiddleware(["Content-manager","superadmin"]), deletePost);
postRoutes.post('/update/:id',authMiddleware,roleMiddleware(["Content-manager","superadmin"]), updatePost);
postRoutes.post('/comment', createComment);
postRoutes.delete('/comment/delete/:id',authMiddleware,roleMiddleware(["Content-manager","superadmin"]), deleteComment);
export default postRoutes;