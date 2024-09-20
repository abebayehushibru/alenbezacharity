import React, { useEffect, useState } from "react";
import CustomizedTable from "../../components/Tables/Table1";
import axios from "axios";
import { ABC_BACKEND_API_URL } from "../../configf/config";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../services/functions";

const Transactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState();
  const [isGift, setIsGift] = useState();
  const [status, setStatus] = useState();
  const [page, setPage] = useState(1); // Pagination
  const [total, setTotal] = useState(0); // Total number of transactions
  const { showToast } = useToast();
  const { user } = useAuth();

  const pageSize = 25;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ABC_BACKEND_API_URL}/admin/transactions`, {
          params: { 
            selectedYear, 
            isGift, 
            status, 
            page 
          },
          headers: {
            'Authorization': 'Bearer ' + user?.token,
            'Content-Type': 'application/json',
          }
        });
        // Map _id to id and reverse the transactions
      const mappedData = response.data.transactions.map(transaction => ({
        ...transaction,
        id: transaction._id,
        date:formatDate(transaction.timestamp) // Map _id to id
      })).reverse();

      setData(mappedData); 
        setTotal(response.data.total); // Set total transactions for pagination
      } catch (e) {
        showToast(e.response?.data?.message || "Error fetching data", "error");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, isGift, status, page, showToast, user?.token]);

  // Ethiopian year offset
  const getCurrentEthiopianYear = () => {
    const now = new Date();
    const gregorianYear = now.getFullYear();
    const gregorianMonth = now.getMonth();
  
    const newYearMonth = 8; // September
    let ethiopianYear = gregorianYear;
    if (gregorianMonth < newYearMonth || (gregorianMonth === newYearMonth && now.getDate() < 11)) {
      ethiopianYear -= 8;
    } else {
      ethiopianYear -= 7;
    }
    return ethiopianYear;
  };

  // Year Selection Component
  const SelectComponent = () => {
    const startEthiopianYear = 2017;
    const currentEthiopianYear = getCurrentEthiopianYear();

    const ethiopianYears = [];
    for (let year = startEthiopianYear; year <= currentEthiopianYear; year++) {
      ethiopianYears.push(year);
    }

    return (
      <div className="flex gap-4 items-start">
        <h2 className="text-lg font-bold text-gray-700">ዓመት ይምረጡ (Select Year)</h2>
        <select
          className="p-1 px-2 border border-gray-300 rounded-md text-gray-700"
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          {ethiopianYears.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          className="p-1 px-2 border border-gray-300 rounded-md text-gray-700"
          onChange={(e) => setIsGift(e.target.value)}
          value={isGift}
        >
          <option value="">All</option>
          <option value="true">Gift</option>
          <option value="false">Not Gift</option>
        </select>

        <select
          className="p-1 px-2 border border-gray-300 rounded-md text-gray-700"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <PaginationControls />
      </div>
    );
  };

  // Pagination Controls
  const PaginationControls = () => {
    return (
      <div className="flex justify-center space-x-4">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded-md"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="font-bold text-gray-700">Page {page}</span>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded-md"
          disabled={page * pageSize >= total}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  const columns = [
    { field: "transactionId", headerName: "T.ID", width: 180 },
    { field: "name", headerName: "Full Name", width: 150 },
    { field: "amount", headerName: "Amount", width: 80 },
    { field: "phoneNumber", headerName: "Phone Number", width: 120 },
    { field: "currency", headerName: "Currency", width: 90 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "paymentMethod", headerName: "Payment Method", width: 140 },
    { field: "date", headerName: "date", width: 120 },
  ];

  return (
    <div className="relative flex max-h-full p-2 py-3 w-full bg-white">
      <CustomizedTable
        columns={columns}
        rows={data}
        loading={loading}
             OtherComponent={SelectComponent}
      />
      
    </div>
  );
};

export default Transactions;
