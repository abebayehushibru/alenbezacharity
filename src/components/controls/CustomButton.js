import React from 'react';

// CustomButton Component
const CustomLoadingButton = ({ action, isLoading, buttonText = "Sign In", loadingText = "Signing In..." ,type="button"}) => {
  return isLoading ? (
    <div
      className="w-full bg-blue-400 text-white py-2 rounded-md flex items-center justify-center gap-2 transition duration-300"
      style={{ height: '40px' }}
    >
      {/* Spinner */}
      <div className="w-3 h-3 border-2 border-t-2 border-t-white border-gray-300 rounded-full animate-spin"></div>
      {/* Loading Text */}
      <span className="text-sm font-medium text-white">{loadingText}</span>
    </div>
  ) : (
    <button
      type={type}    
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      onClick={action}
    >
      {buttonText}
    </button>
  );
};

export default CustomLoadingButton;
