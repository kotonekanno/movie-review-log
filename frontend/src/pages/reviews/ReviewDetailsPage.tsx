import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";

import type { ReviewDetails } from "@/types/review";
import MovieDetailsCard from "@/components/card/MovieDetailsCard";
import ScoreStars from "@/components/ScoreStars";

function ReviewDetailsPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [review, setReview] = useState<ReviewDetails>();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!movieId) return <div>無効なIDです</div>;

  const fetchReview = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${movieId}`);
      const data: ReviewDetails = await res.json();
      setReview(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${movieId}`, {
        method: "DELETE",
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
  }, [movieId]);

  const testReview: ReviewDetails = {
      jaTitle: "スター・ウォーズ",
      originalTitle: "Star Wars",
      releaseYear: 1977,
      posterPath: "/test.jpg",
      score: 4.7,
      text: "面白かった！！！",
      watchedAt: "2026-01-01"
    };

  if (!testReview) return <div>読み込み中...</div>;

  return (
  <div className="max-w-4xl mx-auto space-y-6">

    <MovieDetailsCard movie={testReview} />

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold">
          {testReview.score.toFixed(1)}
        </span>

        <ScoreStars score={testReview.score} />
      </div>

      <div className="text-sm text-muted-foreground">
        鑑賞日: {testReview.watchedAt}
      </div>
    </div>

    <div className="text-base leading-relaxed whitespace-pre-wrap">
      {testReview.text}
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