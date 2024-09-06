import React from 'react';

const Loading = () => {
  return (
    <div className="w-full absolute flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        
        {/* Loading Text */}
        <span className="text-lg font-medium text-gray-700">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
