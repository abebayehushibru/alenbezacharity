import React, { createContext, useContext, useState } from "react";


const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [visible, setVisible] = useState(true); // State to store the user data
  const [type, setType] = useState("loading"); // State to store the user data

  const hidePopup = () => {
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
