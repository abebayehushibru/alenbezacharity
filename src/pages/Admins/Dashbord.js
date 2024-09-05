import React, { useEffect, useState } from "react";
import axios from "axios";
import TopRowCard from "../../components/Cards/TopRowCard";
import { MdArrowUpward } from "react-icons/md";
import TickPlacementBars from "../../components/Barchart";
import OnSeriesItemClick from "../../components/PieChart";
import AdminRecentCard from "../../components/Cards/AdminRecentCard";
import { Link } from "react-router-dom";
import { ABC_BACKEND_API_URL } from "../../configf/config";

const Dashbord = () => {
  const [data,setData]=useState()
  const [loading,setLoading]=useState(true)
  useEffect( () => {
    setLoading(true);
      axios
      .get(ABC_BACKEND_API_URL+"/admin/dashboard")
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
  return (
    <div className="relative flex h-full flex-1 flex-col px-4  mt-1 py-2 bg-white gap-1  ">
      <h2 className=" text-lg font-bold"> Dashboad</h2>
      <div className=" flex flex-col gap-4">
        {/* to row  */}
        <div className="grid grid-cols-3 gap-4">
          <TopRowCard
            colo={"red"}
            number={data?.totals?.members}
            header={"All members"}
            percentile={Number(data?.currentMonthStats.members.percentage)}
            color={"green"}
          />
          <TopRowCard
            colo={"red"}
            Icon={MdArrowUpward}
            number={data?.totals?.posts}
            header={"All Posts"}
            percentile={Number(data?.currentMonthStats.posts.percentage)}
            color={"green"}
          />
          <TopRowCard
            colo={"red"}
            Icon={MdArrowUpward}
            number={data?.totals?.gifts}
            header={"All Gifts"}
            percentile={Number(data?.currentMonthStats.gifts.percentage)}
            color={"green"}
          />
        </div>
        {/* 2nd row  */}
        <div className="grid grid-cols-3 gap-4 ">
          {/* column  1*/}
          <div className=" col-span-2 bg-white shadow-lg px-4 rounded-md  ">
            <TickPlacementBars />
          </div>
          {/* column 2*/}
          <div className="overflow-hidden bg-white shadow-md rounded-md  py-4">
            <OnSeriesItemClick data={data?.groupedPayments|| []} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          <div className=" flex flex-col overflow-hidden bg-white shadow-md rounded-md  p-4 gap-3">
            <div className="flex justify-between items-center ">
              <h2 className="text-[12px] font-semibold uppercase text-black/40">
                Recent Added Monthly payment
              </h2>

              <Link to={"/"} className="text-blue-500 hover:underline">
                see all
              </Link>
            </div>{" "}
            <div>
              <AdminRecentCard />
              <AdminRecentCard />
              <AdminRecentCard />
            </div>
          </div>
          <div className=" flex flex-col overflow-hidden bg-white shadow-md rounded-md  p-4 gap-3">
            <div className="flex justify-between items-center ">
              <h2 className="text-sm font-semibold uppercase text-black/40">
                Recent Added Gifts
              </h2>
              <Link to={"/"} className="text-blue-500 hover:underline">
                see all
              </Link>
            </div>

            <div>
              <AdminRecentCard />
              <AdminRecentCard />
              <AdminRecentCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
