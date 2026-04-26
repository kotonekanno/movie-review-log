import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { ReviewFormValues, CreateReviewResponse, ReviewDetails } from "@/types/review";
import type { MovieDetails } from "@/types/movie";

import ReviewForm from "@/components/form/ReviewForm";
import { toast } from "sonner";

import ReviewFormSkeleton from "@/components/skeleton/ReviewFormSkeleton";
import { createReview, getReviewDetails, editReview } from "@/api/reviews";

type Props =
  | { mode: "create" }
  | { mode: "edit"; reviewId: string };

function ReviewFormContainer(props: Props) {
  const navigate = useNavigate();

  const [prevReview, setPrevReview] = useState<ReviewFormValues>();
  const [prevMovie, setPrevMovie] = useState<MovieDetails>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (review: ReviewFormValues) => {
    if (props.mode === "edit") {
      const payload: Partial<ReviewFormValues> = {};
      if (review.tmdbId !== prevReview?.tmdbId) payload.tmdbId = review.tmdbId;
      if (review.text !== prevReview?.text) payload.text = review.text;
      if (review.score !== prevReview?.score) payload.score = review.score;
      if (review.watchedAt !== prevReview?.watchedAt) payload.watchedAt = review.watchedAt;

      try {
        await editReview(props.reviewId, payload);

          navigate("/reviews");
          toast.success("レビューを更新しました");
      } catch {
        toast.error("レビューの更新に失敗しました");
      }
    } else {
      try {
        await createReview(review);
        
        navigate("/reviews");
        toast.success("レビューを作成しました");
      } catch {
        toast.error("レビューの作成に失敗しました");
      }
    }
  };

  useEffect(() => {
    if (props.mode !== "edit") return;

    const fetchReview = async () => {
      try {
        setLoading(true);

        const data: ReviewDetails = await getReviewDetails(props.reviewId);

        setPrevReview({
          tmdbId: data.movie.tmdbId,
          text: data.text,
          score: data.score,
          watchedAt: data.watchedAt,
        });

        setPrevMovie(data.movie);
      } catch (e) {
        toast.error("エラーが起きました");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [props]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center my-6">
        {(props.mode === "edit") ? "レビュー編集" : "レビュー作成"}
      </h1>

      {loading
        ? <ReviewFormSkeleton />
        : props.mode === "edit" ? (
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
        )
      }
      
    </div>
  );
}

export default ReviewFormContainer;