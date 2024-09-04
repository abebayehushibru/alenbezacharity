import React from "react";
import { Navigate, useNavigation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigation =useNavigation();

  // If the user is not authenticated, redirect to the sign-in page
  if (!isAuthenticated()) {
    return navigation.Navigate("sign-in")  ;
  }

  // Otherwise, render the children components
  return children;
};

export default ProtectedRoute;
