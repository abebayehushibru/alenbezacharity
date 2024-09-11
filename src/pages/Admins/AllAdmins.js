import React, { useEffect, useState } from "react";
import CustomizedTable from "../../components/Tables/Table1";
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";



const AllAdmins = ({ params }) => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect( () => {
        console.log(loading);
        
        axios
        .get(ABC_BACKEND_API_URL+"/users/all")
        .then(async (response) => {
          
          const formattedUsers = response.data.filter(user => user.role !== "member");

          
        setData(formattedUsers||[])
    }).catch((e)=>{
console.log(e);

    });
      }, []);
  const handleDeleteRow = (id) => {};
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
     resizeable:false,
      sortable: false,

      renderCell: (params) => {
        const handleDelete = () => {
          handleDeleteRow(params.row.id);
        };


        return (
          <div className=" relative flex flex-row  justify-around items-center h-full  ">
            <div className="absolute hover:z-10   left-0 hover:w-full action flex items-center gap-3 hover:bg-black/80 py-2  flex-1 px-1 transition-all ease-in-out duration-75">
                <FaTrash size={18} color="red" />
                <span className="absolute hidden right-0  text-white p-2 rounded-sm text-sm">
                    Delete
                </span>
             
            </div>
            <div className="absolute  text-blue-600 hover:text-white flex-row-reverse right-0 hover:w-full hover:z-10 action flex items-center gap-3 hover:bg-black/80 py-2  flex-1 px-1 transition-all ease-in-out duration-75">
            <IoEye size={22}/>
                <span className="absolute hidden left-0  text-white p-2 rounded-sm text-sm">
                    View
                </span>
             
            </div>
           
          </div>
        );
      },
    },

    ,
  ];
  

  return (
    <div className="relative  flex max-h-full p-2 py-3 w-full bg-white">
      <CustomizedTable columns={columns} rows={data} loading={loading} />
    </div>
  );
};

export default AllAdmins;
