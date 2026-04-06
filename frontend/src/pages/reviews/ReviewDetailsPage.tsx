import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";

import type { ReviewDetails } from "@/types/review";
import type { MovieDetails } from "@/types/movie";
import MovieDetailsCard from "@/components/card/MovieDetailsCard";
import ScoreStars from "@/components/others/ScoreStars";

function ReviewDetailsPage() {
  const { reviewId } = useParams<{ reviewId: string }>();
  const [review, setReview] = useState<ReviewDetails>();
  const [movie, setMovie] = useState<MovieDetails>();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchReview = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setReview(data);
        setMovie(prev => ({
          ...prev!,
          jaTitle: data.jaTitle,
          originalTitle: data.originalTitle,
          releaseYear: data.releaseYear,
          posterPath: data.posterPath,
        }));
      } else {
        alert("Get movie details failed");
      }
    } catch (e) {
      alert("Error occured");
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        alert("Delete succeeded");
        navigate("/reviews");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [reviewId]);

  const testReview: ReviewDetails = {
      jaTitle: "スター・ウォーズ",
      originalTitle: "Star Wars",
      releaseYear: 1977,
      posterPath: "/test.jpg",
      score: 4.7,
      text: "面白かった！！！",
      watchedAt: "2026-01-01"
    };

  if (!review) return <div>読み込み中...</div>;

  return (
  <div className="max-w-4xl mx-auto space-y-6">

    <MovieDetailsCard movie={movie} />

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold">
          {review.score.toFixed(1)}
        </span>

        <ScoreStars score={review.score} />
      </div>

      <div className="text-sm text-muted-foreground">
        鑑賞日: {review.watchedAt}
      </div>
    </div>

    <div className="text-base leading-relaxed whitespace-pre-wrap">
      {review.text}
    </div>

    <div className="flex justify-end gap-2">
      <Button
        onClick={() => navigate("/reviews/edit")}
        className="px-6"
      >
        編集
      </Button>
      <ConfirmDialog rightOnClick={handleDelete} />
    </div>

  </div>
);
}

export default ReviewDetailsPage;