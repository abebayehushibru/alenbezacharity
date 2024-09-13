import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { formatDate } from "../../services/functions";

const RecentCards = ({ data }) => {
  return (
    <Link
      className="flex gap-5 border-black/10 border-solid border-[1px] p-2 rounded-sm"
      to={`/post-detail/${data._id}`} // Dynamically set the link based on the post's id
    >
      <img
        src={data.images[0]}
        className="h-20 w-20 rounded-sm object-cover"
        alt="post"
      />
      <div className="flex flex-col justify-between py-1">
        <h2 className="text-sm font-bold text-ellipsis">
          {data.title || "Default Title"} {/* Display post title */}
        </h2>
        <div className="flex items-center gap-3">
          <MdOutlineAccessTimeFilled color="#F84D43" size={16} />
          <p className="text-left text-[12px] text-black/50 font-serif">
            { formatDate(data.createdAt) || "Date not available"} {/* Display post date */}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecentCards;
