import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TransactionCard from "../components/Cards/TransactionCard";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ABC_BACKEND_API_URL } from "../configf/config";
import axios from "axios";
import { useToast } from "../context/ToastContext";
const columns = [
  {
    field: "id",
    renderHeader: () => <span className="text-sm font-extrabold">{"R.No "}</span>,
    width: 50,
    editable: false,
    sortable: false,
  },
  {
    field: "month",
    renderHeader: () => (
      <div className="flex flex-1 justify-center w-full">
        <span className="text-sm font-extrabold">{"Month "}</span>
      </div>
    ),
    editable: false,
    sortable: false,
    width: 150,
    resizable: false,
  },
  {
    field: "status",
    renderHeader: () => (
      <span className="text-sm font-extrabold">{"Status"}</span>
    ),
    editable: false,
    sortable: false,
    width: 140,
    renderCell: (params) => {
      const status = params.value; // Assuming status is stored in 'value'
      const isPaid = status.includes("ተከፍሏል") ;

    // Check if the status contains"አልተከፈለም" for isUnpaid
    const isUnpaid = status.includes("አልተከፈለም");
      // Conditional class for status
      const statusClass = isPaid
        ? "text-green-500 font-bold"
        : isUnpaid
        ? "text-red-500 font-bold"
        : "";
  
      return <span className={statusClass}>{status}</span>;
    },
  }
  
];

const Payments = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
const  {showToast}=useToast()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ABC_BACKEND_API_URL}/donations/getMyDonation`,
          {
            headers: { "Content-Type": "application/json" , 
              Authorization: `Bearer ${user.token}`},
          }
        );
        showToast( response.data.info.message,response.data.info.color==="yellow"?"warning":"success")
        setDatas(response.data); // Assuming response.data is in the format of rows
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        showToast(error.response.data.message || "Error fetching data please refresh the page",)
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

  
    if (!user?.token) {
      window.location.href = "/";
    } else {
      fetchData();
    }
  }, [showToast, user?.id, user?.token]);

  return (
    <div className="max-w-full px-0 sm:px-16 sm:py-5 gap-10">
      <div className="flex flex-col sm:flex-row flex-wrap p-0 sm:px-16 sm:py-16 sm:gap-16">
        <div className="sm:w-1/2 flex flex-col">
          <h2 className="text-center px-5 py-3 bg-black/80 text-white font-serif tracking-wider">
            Your 2024 Monthly Donation Status / <br />
            የእርስዎ የ2024 ወርሃዊ ልገሳ ሁኔታ
          </h2>
          <div
            style={{ width: "100%", }}
            className="hideScrollBar flex justify-center px-4"
          >
            <DataGrid
              rows={datas?.paymentStatus|| []}
              columns={columns}
              columnHeaderHeight={40}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 12 },
                },
              }}
              loading={loading}
              rowHeight={30}
              pageSizeOptions={[12]}
              checkboxSelection={false}
              sortingMode="server"
              className="hideScrollBar"
              disableColumnMenu
              disableAutosize={false}
              disableColumnSelector
            />
          </div>
          {!loading&&<div
            className={`text-white py-4 px-5 rounded-sm mt-4`}
            style={{ backgroundColor: datas?.info?.color,color: datas?.info?.color==="yellow"?"black":"white"}}
          >
            <h2 className="font-bold text-xl text-center">
              {datas?.info?.message.split(".").map(msg=>(
<span className="block text-sm">{msg}</span>
              ))}
            </h2>
          </div>}
          <Link
            className={`relative text-[#F84D43] text-center px-4 p-0 mt-4 w-full flex rounded-full pb-5 sm:pb-0 pt-4`}
            to="/donate-now"
          >
            <span className="flex justify-center items-center text-center h-[46px] w-[200px] hover:font-bold text-sm hover:text-white hover:bg-[#F84D43] border-2 border-[#F84D43] rounded-full transition-transform duration-100 ease-in-out">
              Donate Now
            </span>
            <div className="absolute left-4 text-white bg-[#F84D43] rounded-full p-2 m-0">
              <FaPlus size={30} />
            </div>
          </Link>
        </div>
        <div className="flex flex-col flex-1 gap-5 px-4">
          <div className="flex flex-row gap-2 items-center">
            <div className="h-7 w-1 bg-red-600"></div>
            <h2 className="font-serif text-base font-bold">
              Your Transaction History
            </h2>
          </div>
          <div className="flex flex-col space-y-3 pb-2">
            {
              datas?.transactions?.map((ts,index)=>(
           <TransactionCard
              name={`${ts.transactionId
                }`}
              type={ts.isGif?"Gift for Child":"Monthly donation"}
              amount={ts.amount}
              date={ts.updatedAt}
              key={index}
            />
              ))

            }
            {datas?.transactions?.length===0 && <span className="text-sm">
              No donation history
              please <Link  to="/donate-now" className=" text-red-600 hover:text-blue-600">donate now</Link>
              </span>}
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
