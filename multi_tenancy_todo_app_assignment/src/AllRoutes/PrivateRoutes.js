import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children}) => {
  const role = localStorage.getItem("role");
  const userEmail = localStorage.getItem("user_email");

  // Check if role and userEmail exist in localStorage
  const isAuthenticated = role && userEmail;

  return (
    <>
      {isAuthenticated ? (
        // User is authenticated, render the children components
        children
      ) : (
        // User is not authenticated, redirect to login or desired route

        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
