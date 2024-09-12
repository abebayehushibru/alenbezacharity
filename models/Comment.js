import mongoose from 'mongoose';

// Define the Comment schema
const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from the beginning and end of the string
    },
    image: {
      type: String,
      required: false, // Optional field for the image URL
      default: '', // Default value if no image is provided
    },
    comment: {
      type: String,
      required: true,
      trim: true, // Trims whitespace around the comment
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // Reference to the Post model
      required: true, // Ensures that each comment is linked to a post
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Create the Comment model
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
