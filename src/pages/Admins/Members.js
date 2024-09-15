import React, { useEffect, useState } from "react";
import CustomizedTable from "../../components/Tables/Table1";
import { IoEye } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";

import { Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import DeleteConfirmation from "../../components/Delete";
import AddDonation from "../../components/AddDonation";

const Members = ({ params }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState();
  const {showToast}=useToast();
  const [selectedMemberId, setSelectedMemberId] = useState(null);
   // Track the post to delete
   const [selectedUser, setSelectedUser] = useState(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Track the visibility of the confirmation popup
    const [showAddDonationPopup, setShowAddDonationPopup] = useState(false); // Track the visibility of the confirmation popup


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ABC_BACKEND_API_URL}/users/all`,{
          params: { selectedYear }, // Pass the selected year as a query parameter
        });
        const formattedUsers = response.data.filter(user => user.role !== "banned");
        setData(formattedUsers.reverse());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);
  const openConfirmPopup = (id) => {
    setSelectedMemberId(id);
    setShowConfirmPopup(true);
  };
  const openAdddonationPopup = (user) => {
    setSelectedUser(user);
    setShowAddDonationPopup(true);
  };
  const handleRemoveRole = async (id) => {
    try {
      setLoading(true);
      // Perform the deletion using axios
      await axios.post(`${ABC_BACKEND_API_URL}/admin/updateRole`, { customId: selectedMemberId ,role:"banned"});
      // Update state after deletion
      setData(data.filter((dt) => dt.id !== id));
      setShowConfirmPopup(false); // Hide popup after successful deletion
      showToast("Admin role removed successfully.","success")
      setShowConfirmPopup(false);
      setLoading(false);
     
    } catch (error) {
      setShowConfirmPopup(false);
      setLoading(false);
      console.error("Error deleting post:", error);
     
      showToast("Failed to delete post.","error")
    }
  };
  // Ethiopian year offset
  const  getCurrentEthiopianYear=()=> {
    const now = new Date();
    const gregorianYear = now.getFullYear();
    const gregorianMonth = now.getMonth(); // 0-based index (0 for January, 8 for September)
  
    // Ethiopian New Year is on September 11 (or 12 in a leap year)
    const newYearMonth = 8; // September
  
    let ethiopianYear = gregorianYear;
    if (gregorianMonth < newYearMonth || (gregorianMonth === newYearMonth && now.getDate() < 11)) {
      ethiopianYear -= 8; // Previous Ethiopian year
    } else {
      ethiopianYear -= 7; // Current Ethiopian year
    }
  
    return ethiopianYear;
  }
  const SelectComponent = () => {
    const startEthiopianYear = 2017; // Ethiopian year we start with
    const currentEthiopianYear = getCurrentEthiopianYear(); // Get current Ethiopian year
  
    // Generate an array of Ethiopian years from 2017 to current Ethiopian year
    const ethiopianYears = [];
    for (let year = startEthiopianYear; year <= currentEthiopianYear; year++) {
      ethiopianYears.push(year);
    }
  
    return (
      <div className="flex gap-4 items-start">
        <h2 className="text-lg font-bold text-gray-700">ዓመት ይምረጡ (Select Year)</h2>
        <select className="p-1 px-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e)=>{setSelectedYear(e.target.value)}}
        value={selectedYear}
        >
          {ethiopianYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
            
          ))}
         
        </select>
        <h2 className="text-lg font-bold text-gray-700">ዓ.ም </h2>
       
      </div>
    );
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
      width: 180,
      renderCell: (params) => {
        return (
          <div className="flex flex-row justify-between items-center h-full w-full  ">
            {/* Delete Button - Left */}
            <div className=" w-14  flex justify-center items-center  py-2 transition-all ease-in-out duration-150 group">
              <div className=" left-0  relative flex items-center gap-2  h-full">
                <FaTrash
                  size={18}
                  color="red"
                  onClick={() => openConfirmPopup(params.row.id)}
                  className="group-hover:text-white transition-colors duration-150"
                />
              <span className="z-50 ml-2 min-h-full flex-1  flex-col items-center bg-black/80  absolute left-full -right-2 text-sm text-white hidden group-hover:inline  w-fit px-3 py-3">
                  Delete
                </span>
              </div>
            </div>
    
            {/* View Button - Center */}
            <Link
              to={`../members/view/${params.row.unique_id}`}
             className=" w-14  flex justify-center items-center  py-2 transition-all ease-in-out duration-150 group">
            
            <div className=" left-0  relative flex items-center gap-2  h-full">
                <IoEye
                  size={22}
                  className="text-blue-600 transition-colors duration-150"
                />
                 <span className="z-50 ml-2 min-h-full flex-1  flex-col items-center bg-black/80  absolute left-full -right-2 text-sm text-white hidden group-hover:inline  w-fit px-3 py-3">
                 View
                </span>
              </div>
            </Link>
    
            {/* Delete Button - Right */}
            <div     className=" w-14  flex justify-center items-center  py-2 transition-all ease-in-out duration-150 group">
            <div className=" -left-0  relative flex items-center gap-2  h-full">
                 <FaPlus
                  size={18}
                  color="green"
                  onClick={() => openAdddonationPopup(params.row)}
                  className=" transition-colors duration-150"
                />
                 <span className=" z-50 mr-2 min-h-full flex-1  flex-col items-center bg-black/80  absolute right-full text-sm text-white hidden group-hover:inline  w-fit px-3 py-3">
                 Add payment
                </span>
              </div>
            </div>
          </div>
        );
      },
    }
    
    
  ];

  return (
    <div className="relative flex max-h-full p-2 py-3 w-full bg-white">
      <CustomizedTable
        columns={columns}
        rows={data}
        loading={loading}
        ButtonOne={true}
        ButtonTwo={true}
        add={"member"}
        addTwo={"admin"}
        OtherComponent={SelectComponent}
      />
      {showConfirmPopup && (
    
    <DeleteConfirmation onCancel={() => setShowConfirmPopup(false)} onDelete={() => handleRemoveRole(selectedMemberId) } message={"  Are you sure you want to remove  a member?"}/>
  )}
   {showAddDonationPopup && (
    
    <AddDonation onCancel={() => setShowAddDonationPopup(false)}  user={selectedUser}/>
  )}
    </div>
  );
};

export default Members;
