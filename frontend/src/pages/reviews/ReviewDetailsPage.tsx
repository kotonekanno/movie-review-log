import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import type { ReviewDetails } from "@/types/review";
import type { MovieDetails } from "@/types/movie";

import { Button } from "@/components/ui/button";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import MovieDetailsCard from "@/components/card/MovieDetailsCard";
import ScoreStars from "@/components/others/ScoreStars";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ReviewDetailsPage() {
  const navigate = useNavigate();

  const { reviewId } = useParams<{ reviewId: string }>();
  const [review, setReview] = useState<ReviewDetails>();
  const [movie, setMovie] = useState<MovieDetails>({
    jaTitle: "",
    originalTitle: "",
    releaseYear: 0,
    posterPath: "",
  });

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
        console.error("Get movie details failed");
      }
    } catch (e) {
      console.error("Get movie details failed" + e);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.ok) {
        console.log("Delete succeeded");
        navigate("/reviews");
      } else {
        console.log("Delete failed")
      }
    } catch (e) {
      console.error("Delete failed: " + e);
    }
  };

  useEffect(() => {
    fetchReview();
  }, [reviewId]);

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
        onClick={() => navigate(`/reviews/edit/${review.reviewId}`)}
        className="px-6"
      >
        編集
      </Button>
      <ConfirmDialog leftOnClick={handleDelete} />
    </div>

  </div>
);
}

export default ReviewDetailsPage;