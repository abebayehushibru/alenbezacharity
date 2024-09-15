import React, { useEffect, useState } from "react";
import CustomizedTable from "../../components/Tables/Table1";

import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";


import { useToast } from "../../context/ToastContext";
import { Link } from "react-router-dom";


const Gifts = ({ params }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const {showToast}=useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ABC_BACKEND_API_URL}/donations/gifts`, {
          params: { typeOfGift:selectedType, year:selectedYear, status :selectedStatus,}, // Pass the selected year as a query parameter if needed
        });    
        console.log(response);
        const rowsWithId = response.data.gifts.map((row, index) => ({ ...row, id: row._id })); 
       setData(rowsWithId);
      } catch (e) {
        showToast(e.response.data.message,"error")
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedStatus, selectedType, selectedYear, showToast]);

 
 
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
      <div className="flex gap-5 items-start">
     <div className=" flex gap-3">
     <h2 className="text-sm font-bold text-gray-700">ዓመት ይምረጡ (Select Year)</h2>
        <select className="p-1 px-2 border text-sm border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e)=>{setSelectedYear(e.target.value)}}
        value={selectedYear}
        >
          {ethiopianYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
            
          ))}
         
        </select>
        <h2 className="text-sm font-bold text-gray-700">ዓ.ም </h2>
      </div> 
      <div className=" flex gap-3">
     <h2 className="text-sm font-bold text-gray-700">Gift Type</h2>
        <select className="p-1 px-2 text-sm border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e)=>{setSelectedType(e.target.value)}}
        value={selectedType}
        >
          <option  value="">
            All
            </option>
            <option  value="material">
            Material
            </option>
            <option  value="money">
            Money
            </option>
         
        </select>
       
      </div>  
      <div className=" flex gap-3">
     <h2 className="text-sm font-bold text-gray-700">Status</h2>
        <select className="p-1 px-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e)=>{setSelectedStatus(e.target.value)}}
        value={selectedStatus}
        >
          <option  value="">
            All
            </option>
            <option  value="completed">
            Completed
            </option>
            <option  value="pending">
           Pending
            </option>
            <option  value="failed">
            Failed
            </option>
            
         
         
        </select>
        
      </div>   
       
      </div>
    );
  };

  const  columns = [
    { 
      field: "id", 
      headerName: "R.No", 
      width: 70, 
      renderCell: (params) => params.api.getSortedRowIds().indexOf(params.id) + 1
    },
    { 
      field: "fullname", 
      headerName: "Full Name", 
      width: 180, 
      renderCell: (params) => `${params.row.firstName} ${params.row.lastName}`
    },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "typeOfGift", headerName: "Gift Type", width: 120 },
    { field: "giftRecipient", headerName: "Recipient", width: 120 },
    { field: "status", headerName: "Status", width: 100,renderCell:(params)=>{
      const  gift= params.row;
  return     <p className={`border  flex items-center  justify-center rounded-sm  text-[12px] py-[2px] px-1 capitalize text-white ${gift.status === 'pending' ? 'bg-black/70' : gift.status === 'completed' ? 'bg-green-600 ' : 'bg-red-600'}`}>
      {gift.status}
    </p>
    } },
    { 
      field: "action", 
      headerName: "Action", 
      width: 150, 
      renderCell: (params) => (
        <Link 
          to={`./${params.row.id}`} 
          className="bg-blue-500 text-white px-4 py-1 text-sm rounded my-[1px]">
          View Details
        </Link>
      )
    }
  ];
  
  

  return (
    <div className="relative flex max-h-full p-2 py-3 max-w-full bg-white">
      <CustomizedTable
        columns={columns}
        rows={data}
        loading={loading}
        ButtonOne={true}
      
        add={"gift"}
       
        OtherComponent={SelectComponent}
      />
    
  
    </div>
  );
};

export default Gifts;
