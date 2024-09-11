import React from "react";
import img from "../asserts/images/avatar.png"; // Make sure the path is correct

const Comment = ({ name , photo = img, comment  }) => {
  return (
    <div className="flex gap-3 items-start">
      <img src={photo||img} alt="User Avatar" className="h-10 w-10 rounded-full object-cover" />
      <div className="flex flex-col shadow-md bg-white rounded-sm p-3 gap-1 flex-1">
        <h2 className="text-base font-bold">{name}</h2>
        <p className="text-left text-sm text-black/80 font-serif">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
