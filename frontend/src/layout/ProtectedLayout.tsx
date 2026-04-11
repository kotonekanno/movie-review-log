import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import LoadingOverlay from "@/components/others/LoadingOverlay";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProtectedLayout() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/me`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => {
        if (res.ok) setIsAuthenticated(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingOverlay open={true}/>;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "ログインしてください" }}
      />);
  }

  return <Outlet />;
}

export default ProtectedLayout;