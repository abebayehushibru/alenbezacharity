// controllers/postController.js
import cloudinary from '../config/cloudinary.js';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';


export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Helper function to upload a single image and return its URL
    const uploadImage = (file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject('Image upload failed');
            } else {
              resolve(result.secure_url); // Resolve with the image URL
            }
          }
        );
        uploadStream.end(file.buffer); // Write the buffer data to the stream
      });
    };

    // Upload each image and get their URLs
    const imageUploadPromises = req.files.map(uploadImage);
    const images = await Promise.all(imageUploadPromises);

    console.log(images); // Log the image URLs to verify

    // Create new post with image URLs
    const post = new Post({
      title,
      content,
      images,
    });

    await post.save();

    res.status(201).json({ message: 'Post created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error creating post' });
  }
};
// Controller to get all posts
export const getPosts = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by newest first if you have a createdAt field

    // Send the posts as a response
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};


// Controller to update a post by ID
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params; // Get the post ID from URL parameters
    const { title, content } = req.body; // Get the new title and content from the request body

    // Find the post by ID and update the title and content only
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true } // Options to return the updated post and run validations
    );

    // Check if the post exists
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Send the updated post as a response
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error updating post' });
  }
};
// Controller to delete a post by ID
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid Post ID format' });
    }

    // Delete comments associated with the post
    await Comment.deleteMany({ postId: id });

    // Find and delete the post by ID
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post and associated comments deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting post and associated comments' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid Post ID format' });
    }

    // Find the post by ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Fetch comments associated with the post
    const comments = await Comment.find({ postId: id });

    // Fetch recent posts excluding the current one, sorted by creation date
    const recentPosts = await Post.find({ _id: { $ne: id } })
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(5); // Limit to 5 recent posts

    // Respond with the found post, its comments, and recent posts
    res.status(200).json({ post, comments, recentPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving post' });
  }
};

// Controller to add a comment to a post
export const createComment = async (req, res) => {
  try {
    const { postId, name, comment, image } = req.body;

    // Validate the post ID format
    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid Post ID format' });
    }

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create a new comment
    const newComment = new Comment({
      postId,
      name,
      comment,
      image, // Ensure photo is correctly handled if it's a URL or file
    });

    // Save the comment to the database
    await newComment.save();
    // Respond with the created comment
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding comment' });
  }
};

// delete comments 
export const deleteComment= async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the comment by ID
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
}