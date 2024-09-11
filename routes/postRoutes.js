import express from 'express';
import { createPost } from '../controllers/postController'; // Update the path as necessary
import multer from 'multer';

const postRoutes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

postRoutes.post('/add', upload.array('images'), createPost);

export default postRoutes;