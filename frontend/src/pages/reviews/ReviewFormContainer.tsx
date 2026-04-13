import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ReviewFormValues, CreateReviewResponse } from "@/types/review";
import type { MovieDetails } from "@/types/movie";

import ReviewForm from "@/components/form/ReviewForm";
import { toast } from "sonner";

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

        if (res.status === 204) {
          navigate("/reviews");
          toast.success("レビューを更新しました");
        } else {
          toast.error("レビューの更新に失敗しました");
        }
      } else {
        const res = await fetch(`${API_BASE_URL}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(review),
          credentials: "include",
        });
        
        if (res.status === 201) {
          navigate("/reviews");
          toast.success("レビューを作成しました");
        } else {
          toast.error("レビューの作成に失敗しました");
        }
      }
    } catch (e) {
      toast.error("エラーが起きました");
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

        if (res.status !== 200) {
          toast.error("エラーが起きました");
          return;
        }

        const data = await res.json();
        
        setPrevReview({
          movieId: data.movieId,
          text: data.text,
          score: data.score,
          watchedAt: data.watchedAt,
        });

        setPrevMovie(data.movie);
      } catch (e) {
        toast.error("エラーが起きました");
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