import React, { useState } from "react";
import { useParams } from "react-router-dom";
import img1 from "../asserts/images/landingimage.jpg";
import RecentCards from "../components/Cards/RecentCards";
import { datas } from "../asserts/images/data";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Comment from "../components/Comment";
import { useAuth } from "../context/AuthContext";

const PostDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const post = datas.find((item) => item.id === Number(id));
  const [newComment, setNewComment] = useState({ postid: id, name: "", comment: "", photo: null });
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Abebayehu",
      photo: null,
      comment: "የማኅበራችን አባል የኾነው ወንድም ማሩ ቁንቢ ባደረገልን የፍራሽ እhhdhijis ና የ።",
    },
  ]);
  const recentPosts = datas.filter((item) => item.id !== parseInt(id)).slice(0, 5);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errors, setErrors] = useState({});

  if (!post) {
    return <p className="flex flex-1 justify-center items-center py-40">Post not found {id}</p>;
  }

  // Handle next image
  const handleNext = () => {
    if (post.img.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex === post.img.length - 1 ? 0 : prevIndex + 1));
    }
  };

  // Handle previous image
  const handlePrev = () => {
    if (post.img.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? post.img.length - 1 : prevIndex - 1));
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
      // Replace with your API call here
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.errors || { general: "An error occurred while submitting your comment." });
        return;
      }

      // Assuming the backend returns the new comment
      const addedComment = await response.json();
      setComments((prev) => [...prev, addedComment]);
      setNewComment({ postid: id, name: "", comment: "", photo: null });
    } catch (error) {
      setErrors({ general: "Failed to submit comment. Please try again later." });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap p-4 sm:px-16 sm:py-16 gap-10">
      <div className="sm:w-[70%] w-full flex flex-col gap-5">
        <div className="relative w-full h-[350px] sm:h-[550px] ">
          <img
            src={post.img.length > 0 ? post.img[currentImageIndex] : img1}
            className="relative w-full rounded-md object-cover h-full"
            alt="Post Detail"
          />
          {post.img.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200"
              >
                <FaAnglesLeft />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200"
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
          <p className="text-left text-sm text-black/80 font-serif">{post.content}</p>
          <div className="flex flex-col overflow-hidden bg-white rounded-md py-4 gap-3 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold uppercase text-black/40">All Comments</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-100 p-2">
              {comments.map((cmt) => (
                <Comment key={cmt.id} name={cmt.name} photo={cmt.photo} comment={cmt.comment} />
              ))}
            </div>
             <form onSubmit={handleAddComment} className="flex flex-col gap-3 mt-5">
              <h2 className="text-sm font-semibold uppercase text-black/40">Add a Comment</h2>
              <input
                type="text"
                name="name"
                value={!user?.token ? newComment.name : `${user.firstname} ${user.lastname}`}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="p-2 border rounded-md"
                disabled={!!user?.token}
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
              <textarea
                name="comment"
                value={newComment.comment}
                onChange={handleInputChange}
                placeholder="Your Comment"
                className="p-2 border rounded-md"
                rows="3"
                required
              />
                  {errors.general && <p className="text-red-500">{errors.general}</p>}
       
              {errors.comment && <p className="text-red-500">{errors.comment}</p>}
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
      <div className="flex flex-col flex-1 gap-5">
        <div className="flex flex-row gap-2 items-center">
          <div className="h-7 w-1 bg-red-600"></div>
          <h2 className="font-serif text-base font-bold">Recent News</h2>
        </div>
        <div className="flex flex-col space-y-3">
          {recentPosts.map((recentPost) => (
            <RecentCards key={recentPost.id} data={recentPost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
