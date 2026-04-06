// college/guards/AuthCheck.jsx

import { Navigate } from "react-router-dom";

export default function AuthCheck({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;

  if (role !== "COLLEGE") {
    return <Navigate to="/login" />;
  }

  return children;
}