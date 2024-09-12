import React, { useState } from "react";
import CustomizedTable from "../../components/Tables/Table1";
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import axios from "axios"; // Ensure axios is imported
import DeleteConfirmation from "../../components/Delete";

import { useToast } from "../../context/ToastContext";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null); // Track the post to delete
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Track the visibility of the confirmation popup
  const {showToast} =useToast()
  // Track the visibility of the confirmation popup

  const data = [
    {
      id: "1",
      title: "Exploring the Universe",
      author: "Jane Doe",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla in varius hendrerit...",
      createdDate: "2024-09-05T12:34:56Z",
      image: ["https://example.com/image1.jpg"],
    },
    // ... add other data items
  ];

  // Function to handle the delete action
  const handleDeletePost = async (id) => {
    try {
      // Perform the deletion using axios
      await axios.delete(`${ABC_BACKEND_API_URL}/posts/${id}`);
      // Update state after deletion
      setPosts(posts.filter((post) => post.id !== id));
      setShowConfirmPopup(false); // Hide popup after successful deletion
      showToast("Post deleted successfully.","success")
      setShowConfirmPopup(false);
     
    } catch (error) {
      setShowConfirmPopup(false);
      console.error("Error deleting post:", error);
     
      showToast("Failed to delete post.","error")
    }
  };

  // Function to open the confirmation popup
  const openConfirmPopup = (id) => {
    setSelectedPostId(id);
    setShowConfirmPopup(true);
  };

  // Define columns for the table
  const columns = [
    { field: "index", headerName: "No.", width: 60 },
    {
      field: "image",
      headerName: "Images",
      width: 120,
      renderCell: (params) => (
        <div className="relative flex flex-row justify-around items-center h-full">
          <img src={params.row.image[0]} alt="" className="h-4 w-4 object-cover" />
        </div>
      ),
    },
    { field: "title", headerName: "Title", width: 180 },
    {
      field: "content",
      headerName: "Content",
      width: 300,
      renderCell: (params) => (
        <div className="line-clamp-2 overflow-hidden text-ellipsis">
          {params.row.content}
        </div>
      ),
    },
    { field: "createdDate", headerName: "Created Date", width: 140 },
    {
      field: "action",
      headerName: "Action",
      resizable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="relative flex flex-row justify-around items-center h-full">
            <div className="absolute hover:z-10 left-0 hover:w-full action flex items-center gap-3 hover:bg-black/80 py-2 flex-1 px-1 transition-all ease-in-out duration-75">
              <FaTrash
                size={18}
                color="red"
                onClick={() => openConfirmPopup(params.row.id)}
              />
              <span className="absolute hidden right-0 text-white p-2 rounded-sm text-sm">
                Delete
              </span>
            </div>
            <Link
              to={`./${params.row.id}`}
              className="absolute text-blue-600 hover:text-white flex-row-reverse right-0 hover:w-full hover:z-10 action flex items-center gap-3 hover:bg-black/80 py-2 flex-1 px-1 transition-all ease-in-out duration-75"
            >
              <IoEye size={22} />
              <span className="absolute hidden left-0 text-white p-2 rounded-sm text-sm">
                View
              </span>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="relative flex flex-1 h-full max-w-full p-2 py-3 bg-white">
      <CustomizedTable
        columns={columns}
        rows={data}
        loading={loading}
        add={"post"}
        ButtonOne={true}
      />

      {/* Confirmation Popup */}
      {showConfirmPopup && (
    
        <DeleteConfirmation onCancel={() => setShowConfirmPopup(false)} onDelete={() => handleDeletePost(selectedPostId) } message={"  Are you sure you want to delete this post?"}/>
      )}
    
    </div>
  );
};

export default AllPosts;
