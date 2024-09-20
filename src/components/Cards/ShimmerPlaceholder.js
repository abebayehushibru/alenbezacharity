import React from 'react';

const ShimmerPlaceholder = () => {
  return (
    <div className="flex flex-col rounded-md mx-4 sm:mx-0 sm:max-w-[350px] min-w-[320px] overflow-hidden gap-2 shadow-2xl pb-3 animate-pulse">
      <div className="bg-gray-300 h-[250px] w-full shimmer"></div>
      <div className="px-5 items-start flex flex-col gap-2">
        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-full rounded"></div>
        <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded mt-2"></div>
        <div className="bg-gray-300 h-5 w-1/3 rounded-full"></div>
      </div>
    </div>
  );
};

export default ShimmerPlaceholder;
