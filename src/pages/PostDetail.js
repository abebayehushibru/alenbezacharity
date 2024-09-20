import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecentCards from "../components/Cards/RecentCards";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Comment from "../components/Comment";
import { useAuth } from "../context/AuthContext";
import { ABC_BACKEND_API_URL } from "../configf/config";
import "../Shimmer.css";
const PostDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [comments, setComments] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errors, setErrors] = useState({});

  // Fetch post details by ID
  useEffect(() => {
    setNewComment({ postId: id, name: "", comment: "", photo: null });
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(ABC_BACKEND_API_URL + `/posts/${id}`);
       

        setPost(data.post);
        setComments(data.comments || []); // Assuming comments are part of the response
        setRecentPosts(data.recentPosts || []); // Modify based on your API structure
      } catch (error) {
        console.log(error);

        setError("Failed to fetch post details.");
      } finally {
         setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if ((error || !post)&& !loading) {
    return (
      <p className="flex flex-1 justify-center items-center py-40">
        {error || `Post not found ${id}`}
      </p>
    );
  }

  // Handle next image
  const handleNext = () => {
    if (post.images.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Handle previous image
  const handlePrev = () => {
    if (post.images.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors before submission

    // Client-side validation
    let newErrors = {};
    if (!newComment.name && !user?.token) newErrors.name = "Name is required.";
    if (!newComment.comment) newErrors.comment = "Comment is required.";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        ABC_BACKEND_API_URL + "/posts/comment",
        newComment,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setComments((prev) => [...prev, response.data]);
      setNewComment({ postId: id, name: "", comment: "", image: null });
    } catch (error) {
      setErrors({
        general: "Failed to submit comment. Please try again later.",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap p-4 sm:px-16 sm:py-16 gap-10">
      {loading ? (
        <div className="sm:w-[70%] w-full flex flex-col gap-5">
        <div className="h-[350px] w-fill bg-gray-300 rounded-sm shimmer-box animate-pulse" />
          <div className="px-5 items-start flex flex-col gap-2">
            <div className="shimmer-title w-full h-6 mb-2" />
            <div className="shimmer-text w-full h-4 mb-4" />
            <div className="flex flex-col overflow-hidden bg-white rounded-md py-4 gap-3 mt-4 shimmer-box" />
          </div>
        </div>
      ) : (
        <div className="sm:w-[70%] w-full flex flex-col gap-5">
          <div className="relative w-full h-[350px] sm:h-[550px] bg-black ">
            <img
              src={post.images[currentImageIndex]}
              className="relative w-full rounded-md object-contain  h-full"
              alt="Post Detail"
            />
            {post.images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200"
                >
                  <FaAnglesLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200"
                >
                  <FaAnglesRight />
                </button>
              </>
            )}
          </div>
          <div className="px-5 items-start flex flex-col gap-2">
            <h2 className="text-xl font-bold capitalize hover:text-[#F84D42] cursor-pointer">
              {post.title}
            </h2>
            <p className="text-left text-sm text-black/80 font-serif">
              {post.content}
            </p>
            <div className="flex flex-col overflow-hidden bg-white rounded-md py-4 gap-3 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold uppercase text-black/40">
                  All Comments
                </h2>
              </div>

              {comments.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-100 p-2">
                  {comments.map((cmt) => (
                    <Comment
                      key={cmt._id}
                      name={cmt.name}
                      photo={cmt.photo}
                      comment={cmt.comment}
                    />
                  ))}
                </div>
              )}
              <form
                onSubmit={handleAddComment}
                className="flex flex-col gap-3 mt-5 min-w-[380px]"
              >
                <h2 className="text-sm font-semibold uppercase text-black/40">
                  Add a Comment
                </h2>
                <input
                  type="text"
                  name="name"
                  value={
                    !user?.token
                      ? newComment.name
                      : `${user.firstname} ${user.lastname}`
                  }
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="p-2 border rounded-md focus:outline-blue-400"
                  disabled={!!user?.token}
                  required
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
                <textarea
                  name="comment"
                  value={newComment.comment}
                  onChange={handleInputChange}
                  placeholder="Your Comment"
                  className="p-2 border rounded-md focus:outline-blue-400"
                  rows="3"
                  required
                />
                {errors.general && (
                  <p className="text-red-500">{errors.general}</p>
                )}
                {errors.comment && (
                  <p className="text-red-500">{errors.comment}</p>
                )}
                <button
                  type="submit"
                  className="self-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col flex-1 gap-5">
        <div className="flex flex-row gap-2 items-center">
          <div className="h-7 w-1 bg-red-600"></div>
          <h2 className="font-serif text-base font-bold">Recent News</h2>
        </div>
        <div className="flex flex-col space-y-3">
     {loading ?   Array(3).fill().map((_, index) => (
       <div key={index} className="flex gap-5 border-black/10 border-solid border-[1px] p-2 rounded-sm animate-pulse">
            <div className="h-20 w-20 bg-gray-300 rounded-sm shimmer-box" />
            <div className="flex flex-col justify-between py-1 flex-grow">
              <div className="h-4 w-[80%] bg-gray-300 shimmer-box mb-2" />
              <div className="flex items-center gap-3">
                <div className="h-4 w-4 bg-gray-300 shimmer-box rounded-full" />
                <div className="h-4 w-[60%] bg-gray-300 shimmer-box" />
              </div>
            </div>
          </div>)):
          recentPosts.map((recentPost) => (
            <RecentCards key={recentPost._id} data={recentPost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
