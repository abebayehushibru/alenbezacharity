import React, { useEffect, useState } from "react";
import CustomizedTable from "../../components/Tables/Table1";
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import { usePopup } from "../../context/popUpContext";
import { Link } from "react-router-dom";

const Members = ({ params }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ABC_BACKEND_API_URL}/users/all`);
        console.log(response.data);
        
        setData(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteRow = (id) => {
    // Define deletion logic here
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
        const handleDelete = () => handleDeleteRow(params.row.id);

        return (
          <div className="relative flex flex-row justify-around items-center h-full">
            <div className="absolute hover:z-10 left-0 hover:w-full action flex items-center gap-3 hover:bg-black/80 py-2 flex-1 px-1 transition-all ease-in-out duration-75">
              <FaTrash size={18} color="red" />
              <span className="absolute hidden right-0 text-white p-2 rounded-sm text-sm">
                Delete
              </span>
            </div>
            <Link to={`../members/view/${params.row.unique_id}`} className="absolute text-blue-600 hover:text-white flex-row-reverse right-0 hover:w-full hover:z-10 action flex items-center gap-3 hover:bg-black/80 py-2 flex-1 px-1 transition-all ease-in-out duration-75">
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
        ButtonOne={true}
        ButtonTwo={true}
        add={"member"}
        addTwo={"admin"}
      />
    </div>
  );
};

export default Members;
