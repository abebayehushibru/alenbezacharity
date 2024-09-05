import React, { useEffect, useState } from "react";
import CustomizedTable from "../../components/Tables/Table1";
import { IoEye } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { width } from "@mui/system";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";


const Members = ({ params }) => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect( () => {
      setLoading(true);
        
        axios
        .get(ABC_BACKEND_API_URL+"/users/all")
        .then((response) => {
          console.log(response.data);
          const data=response.data
        setData(data);
        setLoading(false);
    }).catch((e)=>{
      setLoading(false);
console.log(e);

    });
      }, []);
  const handleDeleteRow = (id) => {};
  // eslint-disable-next-line no-sparse-arrays
  const columns = [
    { field: "id", headerName: "Id",width:150},

    { field: "name", headerName: " Full Name", width:200},
    { field: "monthlyamount", headerName: " M/Donation",width:150 },
    { field: "status", headerName: "P.Month", width: 100 },
    { field: "phonenumber", headerName: "Phone No", width: 160 },
   
  
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
  console.log(width);
  
//   const data=[
//     {
//         id: "ABC/0010/12",
//         name: "Abebayehu Shibru",
//         amount: 30,
//         status: 4,
//         phone: "0964799523",
//         email: "abeaba64@gmail.com",
//         address: "Dilla, Ethiopia",
//     },
//     {
//         id: "ABC/0011/12",
//         name: "Mulu Worku",
//         amount: 50,
//         status: 3,
//         phone: "0912345678",
//         email: "muluworku78@gmail.com",
//         address: "Addis Ababa, Ethiopia",
//     },
//     {
//         id: "ABC/0012/12",
//         name: "Tesfaye Alemu",
//         amount: 25,
//         status: 2,
//         phone: "0923456789",
//         email: "tesfaye.alemu@gmail.com",
//         address: "Gondar, Ethiopia",
//     },
//     {
//         id: "ABC/0013/12",
//         name: "Alemnesh Bekele",
//         amount: 40,
//         status: 1,
//         phone: "0934567890",
//         email: "alemnesh.bekele@gmail.com",
//         address: "Hawassa, Ethiopia",
//     },
//     {
//         id: "ABC/0014/12",
//         name: "Kebede Hailu",
//         amount: 60,
//         status: 4,
//         phone: "0945678901",
//         email: "kebede.hailu@gmail.com",
//         address: "Bahir Dar, Ethiopia",
//     },
//     {
//         id: "ABC/0015/12",
//         name: "Sara Kebede",
//         amount: 100,
//         status: 2,
//         phone: "0956789012",
//         email: "sara.kebede@gmail.com",
//         address: "Jimma, Ethiopia",
//     },
//     {
//         id: "ABC/0016/12",
//         name: "Daniel Mesfin",
//         amount: 80,
//         status: 3,
//         phone: "0967890123",
//         email: "daniel.mesfin@gmail.com",
//         address: "Mekelle, Ethiopia",
//     },
//     {
//         id: "ABC/0017/12",
//         name: "Hana Abebe",
//         amount: 45,
//         status: 1,
//         phone: "0978901234",
//         email: "hana.abebe@gmail.com",
//         address: "Adama, Ethiopia",
//     },
//     {
//         id: "ABC/0018/12",
//         name: "Getachew Wolde",
//         amount: 70,
//         status: 2,
//         phone: "0989012345",
//         email: "getachew.wolde@gmail.com",
//         address: "Dire Dawa, Ethiopia",
//     },
//     {
//         id: "ABC/0019/12",
//         name: "Rediet Tesfaye",
//         amount: 90,
//         status: 4,
//         phone: "0990123456",
//         email: "rediet.tesfaye@gmail.com",
//         address: "Harar, Ethiopia",
//     },
//     {
//         id: "ABC/0020/12",
//         name: "Yohannes Mekonnen",
//         amount: 55,
//         status: 3,
//         phone: "0911234567",
//         email: "yohannes.mekonnen@gmail.com",
//         address: "Gambela, Ethiopia",
//     },
//     {
//         id: "ABC/0021/12",
//         name: "Betelhem Tadesse",
//         amount: 35,
//         status: 2,
//         phone: "0922345678",
//         email: "betelhem.tadesse@gmail.com",
//         address: "Jijiga, Ethiopia",
//     },
//     {
//         id: "ABC/0022/12",
//         name: "Fitsum Eshetu",
//         amount: 65,
//         status: 1,
//         phone: "0933456789",
//         email: "fitsum.eshetu@gmail.com",
//         address: "Awassa, Ethiopia",
//     },
//     {
//         id: "ABC/0023/12",
//         name: "Meseret Moges",
//         amount: 85,
//         status: 4,
//         phone: "0944567890",
//         email: "meseret.moges@gmail.com",
//         address: "Debre Markos, Ethiopia",
//     },
//     {
//         id: "ABC/0024/12",
//         name: "Abebe Assefa",
//         amount: 20,
//         status: 3,
//         phone: "0955678901",
//         email: "abebe.assefa@gmail.com",
//         address: "Asosa, Ethiopia",
//     },
//     {
//         id: "ABC/0025/12",
//         name: "Selamawit Alemayehu",
//         amount: 75,
//         status: 2,
//         phone: "0966789012",
//         email: "selamawit.alemayehu@gmail.com",
//         address: "Arba Minch, Ethiopia",
//     },
//     {
//         id: "ABC/0026/12",
//         name: "Meklit Haile",
//         amount: 95,
//         status: 1,
//         phone: "0977890123",
//         email: "meklit.haile@gmail.com",
//         address: "Shashemene, Ethiopia",
//     },
//     {
//         id: "ABC/0027/12",
//         name: "Yared Tsegaye",
//         amount: 50,
//         status: 4,
//         phone: "0988901234",
//         email: "yared.tsegaye@gmail.com",
//         address: "Nekemte, Ethiopia",
//     },
//   ]
  return (
    <div className="relative  flex max-h-full p-2 py-3 w-full bg-white">
      <CustomizedTable columns={columns} rows={data} loading={loading} />
    </div>
  );
};

export default Members;
