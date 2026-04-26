import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import ProtectedLayout from "@/layout/ProtectedLayout";

import RegisterPage from "@/pages/auth/RegisterPage";
import LoginPage from "@/pages/auth/LoginPage";
import HomePage from "@/pages/HomePage";
import ReviewListPage from "@/pages/reviews/ReviewListPage";
import ReviewCreatePage from "@/pages/reviews/ReviewCreatePage";
import ReviewEditPage from "@/pages/reviews/ReviewEditPage";
import ReviewDetailsPage from "@/pages/reviews/ReviewDetailsPage";
import WatchlistPage from "@/pages/watchlist/WatchlistPage";
import { toast, Toaster } from "sonner";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      toast.error("ログインし直してください");
      navigate("/login");
    };

    window.addEventListener("auth:logout", handler);
    return () => window.removeEventListener("auth:logout", handler);
  }, [navigate]);

  return (
    <>
      <Toaster position="top-center" />

        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/reviews" element={<ReviewListPage />} />
              <Route path="/reviews/edit" element={<ReviewCreatePage />} />
              <Route path="/reviews/edit/:reviewId" element={<ReviewEditPage />} />
              <Route path="/reviews/:reviewId" element={<ReviewDetailsPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
            </Route>
          </Route>

        </Routes>
    </>
  )
}

export default App;
