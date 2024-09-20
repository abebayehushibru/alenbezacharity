import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import img1 from "../../asserts/images/landingimage.jpg";
import Comment from "../../components/Comment";
import { useAuth } from "../../context/AuthContext";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import CustomLoadingButton from "../../components/controls/CustomButton";
import axios from "axios"; // Ensure axios is imported
import { ABC_BACKEND_API_URL } from "../../configf/config";
import { TiTimes } from "react-icons/ti";
import DeleteConfirmation from "../../components/Delete";
import { useToast } from "../../context/ToastContext";
import { usePopup } from "../../context/popUpContext";

const AdminPostDetail = () => {
  const { requireRole,isAuthenticated,user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const {showToast}=useToast()
  const {showPopup,hidePopup} =usePopup()
  useEffect(() => {
    const fetchPostData = async () => {
      showPopup("loading")
      try {
        const response = await axios.get(ABC_BACKEND_API_URL+`/posts/${id}`);
        const { post, comments } = response.data;
        setPost(post);
        setComments(comments);
        setEditedPost(post);
        hidePopup()
      } catch (error) {
        hidePopup()
        showToast("Failed to fetch post data","error")
        console.error("Failed to fetch post data:", error);
      }
      
      
    };
    if (requireRole('superadmin','Finance-controller')?true:false) {
      navigate("/")
    }

    fetchPostData();
  }, [hidePopup, id, navigate, requireRole, showPopup, showToast]);

  if (!post) {
    return (
      <p className="flex flex-1 justify-center items-center py-40">
        Post not found {id}
      </p>
    );
  }

  const handleNext = () => {
    if (post.images.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrev = () => {
    if (post.images.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ABC_BACKEND_API_URL+`/posts/update/${id}`, editedPost,{headers: {
        'Authorization': 'Bearer '+user?.token, // Replace <your_token> with your actual token
        'Content-Type': 'application/json',
        // Add any other headers you need
      }});
      setShowEditForm(false);
      showToast("Post Updated successfully","success")
    } catch (error) {
      showToast(error.response?.data.message || "Failed to update post","error")
      console.error("Failed to update post:", error);
      setErrors({});
    }
  };

  const handleDeleteComment = async (id) => {
           try {
        await axios.delete(ABC_BACKEND_API_URL+`/posts/comment/delete/${id}`,{headers: {
          'Authorization': 'Bearer '+user?.token, // Replace <your_token> with your actual token
          'Content-Type': 'application/json',
          // Add any other headers you need
        }});
       
       
       const filteredComments=comments.filter((cm) => cm._id !== id)
       console.log(filteredComments);
       
        setComments(filteredComments); 
        showToast("Comments Deleted successfully","success")
      } catch (error) {
        showToast(error.response?.data.message || "Failed to delete comments","error")
        console.error("Failed to delete comments:", error);
      } finally {
        setShowConfirmPopup(false)
       
      }
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };
  const openConfirmPopup = (id) => {
    setSelectedPostId(id);
    setShowConfirmPopup(true);
  };
  return (
    <div className="flex flex-col sm:flex-row flex-wrap p-4 sm:p-3 gap-10 bg-white mt-1">
      <div className="w-full flex flex-col gap-5">
        <div className="relative w-full h-[350px] sm:h-[450px]">
          <img
            src={post.images.length > 0 ? post.images[currentImageIndex] : img1}
            className="relative w-full rounded-md object-contain h-full"
            alt="Post Detail"
          />
          {post.images.length > 1 && (
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
        <div className="w-full items-start grid sm:grid-cols-1 px-5 gap-5">
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
                value={editedPost.title || ""}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
                disabled={!showEditForm}
                required
              />
               {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              <textarea
                name="content"
                value={editedPost.content || ""}
                onChange={handleInputChange}
                className="p-2 border rounded-md"
                rows="4"
                required
                disabled={!showEditForm}
              />
                {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
              {showEditForm && (
                <div className="w-36">
                  <CustomLoadingButton 
                    loadingText="Saving changes" 
                    type="submit" 
                    buttonText="Save Changes" 
                    isLoading={isSaving} 
                  />
                </div>
              )}
            </form>
          </div>
          <div className="flex flex-col overflow-hidden bg-white rounded-md py-4 gap-3 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold uppercase text-black/40">
                All Comments
              </h2>
            </div>
            <div className="grid grid-cols-1  sm:grid-cols-2  gap-2 bg-slate-100 p-2">
              {comments.map((cmt) => (
                <div className="relative" key={cmt._id}>
                  <Comment
                    
                    name={cmt.name}
                    photo={cmt.photo}
                    comment={cmt.comment}
                  />
                   <button
                  type="button"
                  onClick={() => openConfirmPopup(cmt._id)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full transform "
                >
                  <TiTimes/>
                </button>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
       {/* Confirmation Popup */}
       {showConfirmPopup && (
        <DeleteConfirmation
          onCancel={() => setShowConfirmPopup(false)}
          onDelete={() => handleDeleteComment(selectedPostId)}
          message={"Are you sure you want to delete this comment?"}
        />
      )}
    </div>
  );
};

export default AdminPostDetail;
