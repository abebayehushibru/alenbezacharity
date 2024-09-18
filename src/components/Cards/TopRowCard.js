// TopRowCard.js
import React from "react";
import { Link } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

const TopRowCard = ({ header, Icon, number, percentile, link, color }) => {
  return (
    <div
      className={`border-b-4  border-[${color}] p-2 px-4 bg-white rounded-lg shadow-md`}
    >
      <div className="flex justify-between items-center ">
        <h2 className="text-sm font-semibold uppercase text-black/40">
          {header}
        </h2>
        <Link to={link} className="text-blue-500 hover:underline">
          see all
        </Link>
      </div>
      <div className="relative flex justify-between items-center">
        <div className="flex items-center flex-col justify-center  gap-1">
          <h2 className="text-[18px] font-bold">{number}</h2>
          <p className=" font-semibold text-[11px] mt-1">Total</p>
        </div>
        <Box
          sx={{
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection:"column",
            
          }}
        >
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            {/* Gray Background Circular Progress */}
            <CircularProgress
              variant="determinate"
              value={100}
              thickness={4}
              size={40}
              sx={{ color: "#f3f3f3", position: "absolute", zIndex: 0 }}
            />
            {/* Foreground Circular Progress with colored percentage */}
            <CircularProgress
              variant="determinate"
              value={percentile}
              thickness={4}
              size={40}
              sx={{ color: color, position: "relative", zIndex: 1 }}
            />
            {/* Centered Percentage Text */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            >
              <h2 className=" text-[10px] font-bold">{percentile}%</h2>
            </Box>
          </Box>
          <p className=" font-semibold text-[10px] mt-1">This Month</p>
        </Box>
        
      </div>
    </div>
  );
};

export default TopRowCard;
