import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  // Determine the background color based on the message type
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  useEffect(() => {
    // Set a timer to close the toast after 3000ms
    const timer = setTimeout(onClose, 3000);
    // Clear the timer if the component unmounts before 3000ms
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 p-4 text-white rounded shadow-md ${getBackgroundColor()}`}
    >
      {message}
    </div>
  );
};

export default Toast;
