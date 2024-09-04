import React, { createContext, useContext, useState } from "react";


const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [visible, setVisible] = useState(false); // State to store the user data
  const [type, setType] = useState(""); // State to store the user data

  const hidePopup = (userData) => {
    setVisible(false);
     };


  const showPopup = ( type="login") => {
    setType(type);
    setVisible(true)
  };

  return (
    <PopupContext.Provider value={{ visible, showPopup, hidePopup,type }}>
      {children}
    </PopupContext.Provider>
  );
};

// Custom hook to use 
export const usePopup = () => {
  return useContext(PopupContext);
};
