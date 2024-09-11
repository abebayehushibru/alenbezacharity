import React, { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  // State to control the main popup visibility and type
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("loading");

  // State to control the small popup visibility and content
  const [smallPopupVisible, setSmallPopupVisible] = useState(false);
  const [smallPopupContent, setSmallPopupContent] = useState("");

  // Hide the main popup
  const hidePopup = () => {
    setVisible(false);
  };

  // Show the main popup with a specific type
  const showPopup = (type = "login") => {
    setType(type);
    setVisible(true);
  };

  // Hide the small popup
  const hideSmallPopup = () => {
    setSmallPopupVisible(false);
  };

  // Show the small popup with specific content
  const showSmallPopup = (content="") => {
    setSmallPopupContent(content);
    setSmallPopupVisible(true);
  };

  return (
    <PopupContext.Provider
      value={{
        visible,
        type,
        smallPopupVisible,
        smallPopupContent,
        showPopup,
        hidePopup,
        showSmallPopup,
        hideSmallPopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

// Custom hook to use the Popup context
export const usePopup = () => {
  return useContext(PopupContext);
};
