import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs or paths
    validate: {
      validator: function (images) {
        // Ensure at least one image is present
        return images && images.length > 0;
      },
      message: 'At least one image is required.',
    },
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Post= model('Post', postSchema);
export default  Post
