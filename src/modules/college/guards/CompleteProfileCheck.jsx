// college/guards/CompleteProfileCheck.jsx

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCollegeProfile } from "../services/collegeService";

export default function CompleteProfileCheck({ children }) {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    getCollegeProfile()
      .then(() => setHasProfile(true))
      .catch(() => setHasProfile(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  if (hasProfile) {
    return <Navigate to="/college/dashboard" />;
  }

  return children;
}