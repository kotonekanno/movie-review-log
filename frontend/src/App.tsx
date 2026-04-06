import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import ProtectedLayout from "@/layout/ProtectedLayout";

import RegisterPage from "@/pages/auth/RegisterPage";
import LoginPage from "@/pages/auth/LoginPage";
import HomePage from "@/pages/HomePage";
import ReviewListPage from "@/pages/reviews/ReviewListPage";
import ReviewCreatePage from "@/pages/reviews/ReviewEditPage";
import ReviewDetailsPage from "@/pages/reviews/ReviewDetailsPage";
import WatchlistPage from "@/pages/watchlist/WatchlistPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/reviews" element={<ReviewListPage />} />
            <Route path="/reviews/edit" element={<ReviewCreatePage />} />
            <Route path="/reviews/edit/:reviewId" element={<ReviewCreatePage />} />
            <Route path="/reviews/:reviewId" element={<ReviewDetailsPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
