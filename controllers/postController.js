
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import Post from '../models/Post';

// Setup multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const createPost = async (req, res) => {
  try {
    // Upload images to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (result) imageUrls.push(result.secure_url);
          if (error) throw error;
        }).end(file.buffer);
      }
    }

    // Create a new post with the image URLs
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      images: imageUrls,
    });

    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};
