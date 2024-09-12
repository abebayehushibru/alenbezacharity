import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the Toast Context
const ToastContext = createContext();

// Custom hook to use the Toast Context
export const useToast = () => useContext(ToastContext);

// ToastProvider component to wrap your application
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  // Function to show the toast
  const showToast = useCallback((message, type) => {
    setToast({ message, type });

    // Automatically hide the toast after 2000ms
    setTimeout(() => {
      setToast(null);
    }, 2000);
  }, []);

  // Context value to provide to consuming components
  const value = {
    showToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};

// The Toast component to display the message
const Toast = ({ message, type }) => {
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

  return (
    <div
      className={` z-50 fixed top-5 right-5 p-4 text-white rounded shadow-md ${getBackgroundColor()}`}
    >
      {message}
    </div>
  );
};
