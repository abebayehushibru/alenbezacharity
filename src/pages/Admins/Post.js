import React, { useState, useEffect } from "react";
import CustomizedTable from "../../components/Tables/Table1";
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import axios from "axios";
import DeleteConfirmation from "../../components/Delete";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const { showToast } = useToast();
  const { user } = useAuth();
  // Fetch all posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ABC_BACKEND_API_URL}/posts`,{
          headers: {
            'Authorization': 'Bearer '+user?.token, // Replace <your_token> with your actual token
            'Content-Type': 'application/json',
            // Add any other headers you need
          }
        });

        // Map over the fetched data to change _id to id
        const fetchedArray = response.data.map((post,index) => ({
          ...post,
          id: post._id, 
          index:index+1 // Rename _id to id
        }));
  
        setPosts(fetchedArray);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        showToast("Failed to fetch posts.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [showToast, user?.token]);

  // Function to handle the delete action
  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${ABC_BACKEND_API_URL}/posts/delete/${id}`,{
        headers: {
          'Authorization': 'Bearer '+user?.token, // Replace <your_token> with your actual token
          'Content-Type': 'application/json',
          // Add any other headers you need
        }
      });
      setPosts(posts.filter((post) => post._id !== id)); // Update state after deletion
      setShowConfirmPopup(false);
      showToast("Post deleted successfully.", "success");
    } catch (error) {
      console.error("Error deleting post:", error);
      setShowConfirmPopup(false);
      showToast(error.response?.data.message ||"Failed to delete post!", "error");
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
        <div className=" m-w-full flex flex-row  h-full  justify-center items-center">
          <img
            src={params.row.images?.[0] || "https://via.placeholder.com/50"}
            alt=""
            className="h-8 w-8 absolute object-cover hover:h-auto  hover:w-40 hover:z-50"
          />
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
    { field: "createdAt", headerName: "Created Date", width: 140 },
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
                onClick={() => openConfirmPopup(params.row._id)}
              />
              <span className="absolute hidden right-0 text-white p-2 rounded-sm text-sm">
                Delete
              </span>
            </div>
            <Link
              to={`./${params.row._id}`}
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
        rows={posts}
        loading={loading}
        add={"post"}
        ButtonOne={true}
      />

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <DeleteConfirmation
          onCancel={() => setShowConfirmPopup(false)}
          onDelete={() => handleDeletePost(selectedPostId)}
          message={"Are you sure you want to delete this post?"}
        />
      )}
    </div>
  );
};

export default AllPosts;
