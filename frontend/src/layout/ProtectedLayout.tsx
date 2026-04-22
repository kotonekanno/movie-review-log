import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import LoadingOverlay from "@/components/others/LoadingOverlay";
import { me } from "@/api/auth";

function ProtectedLayout() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    me()
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
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