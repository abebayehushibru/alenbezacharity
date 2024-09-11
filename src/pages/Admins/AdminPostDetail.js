import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import img1 from "../../asserts/images/landingimage.jpg";

import { datas } from "../../asserts/images/data";

import Comment from "../../components/Comment";
import { useAuth } from "../../context/AuthContext";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import CustomLoadingButton from "../../components/controls/CustomButton";

const AdminPostDetail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const post = datas.find((item) => item.id === Number(id));
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Abebayehu",
      photo: null,
      comment: "የማኅበራችን አባል የኾነው ወንድም ማሩ ቁንቢ ባደረገልን የፍራሽ እhhdhijis ና የ።",
    },
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [errors, setErrors] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setEditedPost(post);
  }, [post]);

  if (!post) {
    return (
      <p className="flex flex-1 justify-center items-center py-40">
        Post not found {id}
      </p>
    );
  }

  const handleNext = () => {
    if (post.img.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === post.img.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrev = () => {
    if (post.img.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? post.img.length - 1 : prevIndex - 1
      );
    }
  };

  const handleEditPost = (e) => {
    e.preventDefault();
    // Implement API call to update the post
    console.log("Edited post:", editedPost);
    // After successful update
    setShowEditForm(false);
  };

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setIsDeleting(true);
      // Implement API call to delete the post
      try {
        // Example API call
        await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        });
        navigate("/admin/posts"); // Redirect to posts list after deletion
      } catch (error) {
        console.error("Failed to delete post:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap p-4 sm:p-3 gap-10 bg-white mt-1">
      <div className=" w-full flex flex-col  gap-5">
        <div className=" relative w-full h-[350px] sm:h-[450px]">
          <img
            src={post.img.length > 0 ? post.img[currentImageIndex] : img1}
            className="relative w-full rounded-md object-contain h-full"
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
        <div className="w-full items-start gird  sm:grid-cols-2 px-5">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Editable Mode</span>

              <div className="flex items-center">
                <label htmlFor="editableToggle" className="switch">
                  <input
                    id="editableToggle"
                    type="checkbox"
                    checked={showEditForm}
                    onChange={() => setShowEditForm(!showEditForm)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          
              <form
                onSubmit={handleEditPost}
                className="flex flex-col gap-3 mt-5"
              >
                <input
                  type="text"
                  name="title"
                  value={editedPost.title}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                  disabled={!showEditForm}
                  required
                />
                <textarea
                  name="content"
                  value={editedPost.content}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md"
                  rows="4"
                  required
                  disabled={!showEditForm}
                />
             {showEditForm  && <div className=" w-36">

                 <CustomLoadingButton loadingText="saving changes"  type="submit" buttonText=" Save Changes" isLoading={false}/> 
                    
             </div> }
                
              </form>
            
          </div>
          <div className="flex flex-col overflow-hidden bg-white rounded-md py-4 gap-3 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold uppercase text-black/40">
                All Comments
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-100 p-2">
              {comments.map((cmt) => (
                <Comment
                  key={cmt.id}
                  name={cmt.name}
                  photo={cmt.photo}
                  comment={cmt.comment}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPostDetail;
