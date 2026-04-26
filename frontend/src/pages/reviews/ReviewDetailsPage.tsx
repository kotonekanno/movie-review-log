import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import type { ReviewDetails } from "@/types/review";
import type { MovieDetails } from "@/types/movie";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import MovieDetailsCard from "@/components/card/MovieDetailsCard";
import ScoreStars from "@/components/others/ScoreStars";
import ReviewDetailsPageSkeleton from "@/components/skeleton/ReviewDetailsPageSkeleton";
import { deleteReview, getReviewDetails } from "@/api/reviews";

function ReviewDetailsPage() {
  const navigate = useNavigate();

  const { reviewId } = useParams<{ reviewId: string }>();
  const [review, setReview] = useState<ReviewDetails>();
  const [movie, setMovie] = useState<MovieDetails>({
    tmdbId: 0,
    jaTitle: "",
    originalTitle: "",
    posterPath: "",
    genres: [],
    productionCountries: [],
    releaseYear: 0,
    runtime: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReview = async () => {
    try {
      setLoading(true);

      const data = await getReviewDetails(reviewId!);

      setReview(data);
      setMovie(data.movie);
    } catch (e) {
      toast.error("レビューの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId!);
      
      navigate("/reviews");
      toast.success("レビューを削除しました");
    } catch (e) {
      toast.error("レビューの削除に失敗しました");
    }
  };

  useEffect(() => {
    fetchReview();
  }, [reviewId]);

  return (
    <>
      {loading
        ? <ReviewDetailsPageSkeleton />
        : review ? (
          <div className="max-w-4xl mx-auto space-y-6">

            {movie && <MovieDetailsCard movie={movie} />}

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
              <ConfirmDialog
                title="レビューを削除しますか？"
                text="この操作は取り消せません。削除するとレビューは完全に消去されます。"
                buttonText="削除"
                leftOnClick={handleDelete}
              />
            </div>

          </div>
        ) : <div className="text-center text-gray-500">レビューがありません</div>
      }
    </>
  );
}

export default ReviewDetailsPage;