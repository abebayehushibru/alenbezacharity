import React, { useEffect, useState } from "react";
import CustomizedTable from "../../components/Tables/Table1";
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";

import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import DeleteConfirmation from "../../components/Delete";
import { useAuth } from "../../context/AuthContext";

const AllDeletedMembers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {showToast}=useToast();
  const [selectedMemberId, setSelectedMemberId] = useState(null); // Track the post to delete
 const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Track the visibility of the confirmation popup
 const {user}=useAuth()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ABC_BACKEND_API_URL}/users/all`,{headers: {
          'Authorization': 'Bearer ' +user?.token, 
          'Content-Type': 'application/json',
          // Add more headers as needed
        }});
        const formattedUsers = response.data.filter(user => user.role === "banned");
       console.log(formattedUsers);
       
        setData(formattedUsers);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const openConfirmPopup = (id) => {
    setSelectedMemberId(id);
    setShowConfirmPopup(true);
  };
  const handleRemoveRole = async (id) => {
    try {
      setLoading(true);
      // Perform the deletion using axios
      await axios.post(`${ABC_BACKEND_API_URL}/admin/updateRole`, { customId: selectedMemberId ,role:"member"});
      // Update state after deletion
      setData(data.filter((dt) => dt.id !== id));
      setShowConfirmPopup(false); // Hide popup after successful deletion
      showToast("User has been reinstated as a member successfully.", "success");
      setShowConfirmPopup(false);
      setLoading(false);
     
    } catch (error) {
      setShowConfirmPopup(false);
      setLoading(false);
      console.error("Error reinstated as member:", error);
     
      showToast("Error has occured reinstated as member","error")
    }
  };

  const columns = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "name", headerName: "Full Name", width: 200 },
    { field: "monthlyamount", headerName: "M/Donation", width: 150 },
    { field: "status", headerName: "P.Month", width: 100 },
    { field: "phonenumber", headerName: "Phone No", width: 160 },
    {
      field: "action",
      headerName: "Action",
      resizable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="relative flex flex-row justify-around items-center h-full cursor-pointer">
            <div className="absolute hover:z-10 left-0 hover:w-full action flex items-center gap-3 hover:bg-black/80 py-2 flex-1 px-1 transition-all ease-in-out duration-75"
            onClick={() => openConfirmPopup(params.row.id)}>
              <FaTrash
                size={18}
                color="red"
                
              />
              <span className="absolute hidden right-0 text-white p-2 rounded-sm text-sm">
              Reinstate
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
  ];

  return (
    <div className="relative flex max-h-full p-2 py-3 w-full bg-white">
      <CustomizedTable
        columns={columns}
        rows={data}
        loading={loading}
       
      />
      {showConfirmPopup && (
    
    <DeleteConfirmation onCancel={() => setShowConfirmPopup(false)} onDelete={() => handleRemoveRole(selectedMemberId) } message={" Are you sure you want to reinstate this banned member?"} buttonText="Reinstate"/>
  )}
    </div>
  );
};

export default AllDeletedMembers;
