import React, { useState } from "react";
import Buttons from "../components/Buttons";
import { DataGrid } from "@mui/x-data-grid";
import TransactionCard from "../components/Cards/TransactionCard";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const DataTable = () => {
  const columns = [
    {
      field: "id",
      renderHeader: (params) => <strong>{"R.No "}</strong>,
      width: 50,
      editable: false,
      sortable: false,
    },
    {
      field: "month",
      renderHeader: (params) => (
        <div className=" flex flex-1 justify-center w-full  ">
          <strong>{"Month "}</strong>
        </div>
      ),
      editable: false,
      sortable: false,
      width: 140,
      resizeable: false,
    },
    {
      field: "status",
      renderHeader: (params) => <strong>{"Status "}</strong>,
      editable: false,
      sortable: false,
      width: 140,
    },
  ];

  const rows = [
    { id: 1, month: "መስከረም / September", status: "ተከፍሏል / Paid" }, // September
    { id: 2, month: "ጥቅምት / October", status: "ተከፍሏል / Paid" }, // October
    { id: 3, month: "ህዳር / November", status: "አልተከፈለም / Unpaid" }, // November
    { id: 4, month: "ታኅሳስ / December", status: "አልተከፈለም / Unpaid" }, // December
    { id: 5, month: "ጥር / January", status: "ገና ሚከፈል / Pending" }, // January
    { id: 6, month: "የካቲት / February", status: "Pending" }, // February
    { id: 7, month: "መጋቢት / March", status: "Pending" }, // March
    { id: 8, month: "ሚያዝያ / April", status: "Pending" }, // April
    { id: 9, month: "ግንቦት / May", status: "Pending" }, // May
    { id: 10, month: "ሰኔ / June", status: "Pending" }, // June
    { id: 11, month: "ሐምሌ / July", status: "Pending" }, // July
    { id: 12, month: "ነሐሴ / August", status: "Pending" }, // August
  ];

  const row2 = [
    { id: 7, month: "March", status: "Pending" },
    { id: 8, month: "April", status: "Pending" },
    { id: 9, month: "May", status: "Pending" },
    { id: 10, month: "June", status: "Pending" },
    { id: 11, month: "July", status: "Pending" },
    { id: 12, month: "August", status: "Pending" },
  ];
  return (
    <div
      style={{ height: "400px", width: "100%" }}
      className="hideScrollBar flex justify-center"
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 12 },
          },
        }}
        pageSizeOptions={[12]}
        checkboxSelection={false}
        sortingMode="server"
        className="hideScrollBar"
        disableColumnMenu
        disableAutosize={false}
        disableColumnSelector
      />
    </div>
  );
};

const Payments = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  return (
    <div className="  max-w-full px-0 sm:px-16 sm:py-5 gap-10">
  
      <div className=" flex flex-col sm:flex-row flex-wrap  p-0 sm:px-16 sm:py-16 sm:gap-16">
        <div className=" sm:w-1/2 flex flex-col ">
          <h2 className=" text-center px-5 py-3 bg-black/80 text-white  font-serif tracking-wider">
            Your 2024 Monthly Donation Status/ <br></br>
            የእርስዎ የ2024 ወርሃዊ ልገሳ ሁኔታ
          </h2>
          <DataTable />
          <div
            className={`text-white py-4 px-5 rounded-sm mt-4`}
            style={{ backgroundColor: "green" }}
          >
            <h2 className="font-bold text-xl text-center ">
              ወራዊ ክፍያዎን በጊዜ ስለ ከፈሉ እናመሰናለን
            </h2>
          </div>
          <Link
            className={`relative text-[#F84D43]  text-center p-0  mt-4 w-full flex rounded-full pb-5 sm:pb-0 pt-4 `}
           
           to="/donate-now">
            <span className=" flex justify-center items-center text-center h-[46px] w-[200px] hover:font-bold text-sm  hover:text-white hover:bg-[#F84D43] border-2 border-[#F84D43] rounded-full  transition-transform duration-100 ease-in-out">
              Donate Now
            </span>
            <div  className="absolute left-0  text-white bg-[#F84D43] rounded-full p-2  m-0 ">
              <FaPlus size={30}/>
            </div>
            
          </Link>
          
        </div>
        <div className=" flex flex-col flex-1 gap-5">
          <div className=" flex flex-row gap-2 items-center">
            <div className=" h-7 w-1 bg-red-600"></div>
            <h2 className=" font-serif text-base font-bold">
              Your Transaction History
            </h2>
          </div>
          <div className=" flex flex-col space-y-3">
            <TransactionCard  name={"Abebayehu Shibru"} type={"Gift for Child"} amount={300}/>
            <TransactionCard  name={"Abebayehu Shibru"} type={"Monthly donation"} amount={400}/>
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
