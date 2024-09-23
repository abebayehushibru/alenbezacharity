import React, { useEffect, useState } from "react";
import CustomizedTable from "../../components/Tables/Table1";
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import { useToast } from "../../context/ToastContext";
import DeleteConfirmation from "../../components/Delete";
import { Link } from "react-router-dom";
import {useAuth} from '../../context/AuthContext'


const AllAdmins = ({ params }) => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true);
    const [selectedMemberId, setSelectedMemberId] = useState(null); // Track the post to delete
    const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Track the visibility of the confirmation popup
     const {user}=useAuth()
   const {showToast}= useToast()
    useEffect( () => {
      setLoading(true);
        
        axios
        .get(ABC_BACKEND_API_URL+"/users/all",{
          headers: {
            'Authorization': 'Bearer ' +user?.token, 
            'Content-Type': 'application/json',
            // Add more headers as needed
          }
        })
        .then(async (response) => {
       const formattedUsers = response.data.filter(user => user.role !== "member" && user.role !== "banned");
        setData(formattedUsers||[])
        setLoading(false);
    }).catch((e)=>{
      setLoading(false);
       showToast("Something went be wrong  please check your connection or try again","error");
    });
      }, [showToast, user?.token]);
       // Function to open the confirmation popup
  const openConfirmPopup = (id) => {
    setSelectedMemberId(id);
    setShowConfirmPopup(true);
  };
   // Function to handle the delete action
   const handleRemoveRole = async (id) => {
    try {
      // Perform the deletion using axios
      await axios.post(`${ABC_BACKEND_API_URL}/admin/updateRole`, { customId: selectedMemberId ,role:"member"},{
        headers: {
          'Authorization': 'Bearer ' +user?.token, 
          'Content-Type': 'application/json',
          
        }
      });
      // Update state after deletion
      setData(data.filter((dt) => dt.id !== id));
      setShowConfirmPopup(false); // Hide popup after successful deletion
      showToast("Admin role removed successfully.","success")
      setShowConfirmPopup(false);
     
    } catch (error) {
      setShowConfirmPopup(false);
      console.error("Error deleting post:", error);
     
      showToast("Failed to delete post.","error")
    }
  };


  // eslint-disable-next-line no-sparse-arrays
  const columns = [
    { field: "id", headerName: "Id",width:150},
    { field: "name", headerName: " Full Name", width:200},
    { field: "email", headerName: "Email", width:200},
    { field: "phonenumber", headerName: "Phone No", width: 160 },
    { field: "role", headerName: " Role", width: 100 },
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
              to={`./${params.row.unique_id}`}
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
    ,
  ];
  

  return (
    <div className="relative flex max-h-full p-2 py-3 w-full bg-white">
      <CustomizedTable columns={columns} rows={data} loading={loading} ButtonOne={true}  add={"admin"}/>
      {showConfirmPopup && (
    
    <DeleteConfirmation onCancel={() => setShowConfirmPopup(false)} onDelete={() => handleRemoveRole(selectedMemberId) } message={"  Are you sure you want to remove admin role?"}/>
  )}
    </div>
  );
};

export default AllAdmins;
