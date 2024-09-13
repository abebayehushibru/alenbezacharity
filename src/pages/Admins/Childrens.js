import React, { useEffect, useState } from "react";
import CustomizedTable from "../../components/Tables/Table1"; // Assuming this is a reusable table component
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../../components/Delete";
import { useToast } from "../../context/ToastContext";

const AllChildren = ({ params }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const {showToast}=useToast();
  const [selectedChild, setSelectedChild] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Track the visibility of the confirmation popup

  useEffect(() => {
    
    axios
      .get(ABC_BACKEND_API_URL + "/child") // Update the URL to match your children API endpoint
      .then((response) => {
        console.log(response.data);
        
        const formattedChildren = response.data.map((child,index) => ({
         index: index+1,
          id: child._id, // Assuming MongoDB ObjectId is used
          name: `${child.firstName} ${child.lastName}`, // Combine first and last name for display
          nickName: child.nickName || "-", // Display "-" if no nickname
          grade: child.grade,
          enteryYear:child.enteryYear,
          hobbies: child.hobbies.join(", "), // Join array of hobbies into a single string
          favoriteSubject: child.favoriteSubject || "-", // Display "-" if no favorite subject
          enrolledDate: new Date(child.enrolledDate).toLocaleDateString(), // Format date
        }));

        setData(formattedChildren || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  

  const columns = [
    {
      field: "index",
      headerName: "Roll No",
      width: 80,
     
    },
    { field: "name", headerName: "Full Name", width: 180 },
    { field: "nickName", headerName: "Nick Name", width: 120 },
    { field: "grade", headerName: "Grade", width: 100 },
    
    { field: "enteryYear", headerName: "Entery year", width: 140 },
    { field: "enrolledDate", headerName: "Enrolled Date", width: 140 },
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
            <Link to={`./${params.row.id}`} className="absolute text-blue-600 hover:text-white flex-row-reverse right-0 hover:w-full hover:z-10 action flex items-center gap-3 hover:bg-black/80 py-2 flex-1 px-1 transition-all ease-in-out duration-75">
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
  const openConfirmPopup = (id) => {
    setSelectedChild(id);
    setShowConfirmPopup(true);
  };
  const handleRemoveChild = async (id) => {
    try {
      setLoading(true);
      // Perform the deletion using axios
      await axios.delete(`${ABC_BACKEND_API_URL}/child/delete/${id}`);
      // Update state after deletion
      setData(data.filter((dt) => dt.id !== id));
      setShowConfirmPopup(false); // Hide popup after successful deletion
      showToast("Child removed successfully.","success")
      setShowConfirmPopup(false);
      setLoading(false);
     
    } catch (error) {
      setShowConfirmPopup(false);
      setLoading(false);
      console.error("Error deleting child:", error);
     
      showToast("Failed to delete child.","error")
    }
  };
  return (
    <div className="relative flex flex-1 h-full max-w-full p-2 py-3 bg-white">
      <CustomizedTable columns={columns} rows={data} loading={loading}  add={"child"}  ButtonOne={true} />
      {showConfirmPopup && (
    
    <DeleteConfirmation onCancel={() => setShowConfirmPopup(false)} onDelete={() => handleRemoveChild(selectedChild) } message={"  Are you sure you want to remove  thi child?"}/>
  )}
    </div>
  );
};

export default AllChildren;
