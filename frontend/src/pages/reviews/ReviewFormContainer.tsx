import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ReviewFormValues, CreateReviewResponse } from "@/types/review";
import type { MovieDetails } from "@/types/movie";

import ReviewForm from "@/components/form/ReviewForm";

type Props =
  | { mode: "create" }
  | { mode: "edit"; reviewId: string };

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ReviewFormContainer(props: Props) {
  const navigate = useNavigate();

  const [prevReview, setPrevReview] = useState<ReviewFormValues>();
  const [prevMovie, setPrevMovie] = useState<MovieDetails>();

  const handleSubmit = async (review: ReviewFormValues) => {
    try {
      if (props.mode === "edit") {
        const payload: Partial<ReviewFormValues> = {};
        if (review.movieId !== prevReview?.movieId) payload.movieId = review.movieId;
        if (review.text !== prevReview?.text) payload.text = review.text;
        if (review.score !== prevReview?.score) payload.score = review.score;
        if (review.watchedAt !== prevReview?.watchedAt) payload.watchedAt = review.watchedAt;

        const res = await fetch(`${API_BASE_URL}/reviews/${props.reviewId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });

        if (res.status === 200) {
          navigate("/reviews")
        }

        return;
      } else {
        const res = await fetch(`${API_BASE_URL}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(review),
          credentials: "include",
        });
        
        if (res.status === 201) {
          navigate("/reviews");
        }

        return;
      }
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    if (props.mode !== "edit") return;

    const fetchReview = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/reviews/${props.reviewId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        
        setPrevReview({
          movieId: data.movieId,
          text: data.text,
          score: data.score,
          watchedAt: data.watchedAt,
        });

        setPrevMovie({
          movieId: data.movieId,
          jaTitle: data.jaTitle,
          originalTitle: data.originalTitle,
          releaseYear: data.releaseYear,
          posterPath: data.posterPath,
        })
      } catch (e) {
        return;
      }
    };

    fetchReview();
  }, [props]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center my-6">
        {(props.mode === "edit") ? "レビュー編集" : "レビュー作成"}
      </h1>

      {props.mode === "edit" ? (
        prevReview && prevMovie && (
          <ReviewForm
            mode="edit"
            onSubmit={handleSubmit}
            prevReview={prevReview}
            prevMovie={prevMovie}
          />
        )
      ) : (
        <ReviewForm
          mode="create"
          onSubmit={handleSubmit}
        />
      )}
      
    </div>
  );
}

export default ReviewFormContainer;