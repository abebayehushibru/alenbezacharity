import React, { createContext, useContext, useState } from "react";
// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
 

  // Initialize state based on stored data or fallback to default
  const [user, setUser] = useState(storedUser);

  // Function to log in the user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return user !== null;
  };

  // Function to check if the user has one of the required roles
  const hasRole = (...roles) => {
    return roles.includes(user?.role);
  };

  // Function to ensure user has required role, otherwise redirect
  const requireRole = (...roles) => {
    return isAuthenticated() && hasRole(...roles) 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, hasRole, requireRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};
