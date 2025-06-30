// lib/ProtectedAuthRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedAuthRoute = ({ children }) => {
  const isAdmin = useSelector((state) => state.adminAuth.admin);
  console.log(isAdmin);
  if (isAdmin) {
    // If already logged in, redirect away from login/signup
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

