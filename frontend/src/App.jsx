import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import ReviewListPage from "./pages/review/ReviewListPage";
import ReviewCreatePage from "./pages/review/ReviewCreatePage";
import ReviewDetailsPage from "./pages/review/ReviewDetailsPage";
//import WatchlistPage from "./pages/watchlist/WatchlistPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reviews" element={<ReviewListPage />} />
        <Route path="/reviews/create" element={<ReviewCreatePage />} />
        <Route path="/reviews/:movieId" element={<ReviewDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;