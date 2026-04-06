import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { ReviewFormValues, CreateReviewResponse } from "@/types/review";

import ReviewForm from "@/components/form/ReviewForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ReviewCreatePage() {
  const navigate = useNavigate();

  const { reviewId } = useParams<{ reviewId?: string }>();
  const [prevReview, setPrevReview] = useState<ReviewFormValues>();
  let handleSubmit;

  if (reviewId) {
    handleSubmit = async (review: ReviewFormValues) => {
      try {
        const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(review),
          credentials: "include",
        });
        const data: CreateReviewResponse = await res.json();
        if (res.status === 201) {
          console.log("Review successfully created: " + data.reviewId);
          navigate("/reviews")
        } else {
          console.error("Review patch failed")
        }
      } catch (e) {
        console.error("Review patch failed: " + e);
      }
    };
  } else {
    handleSubmit = async (review: ReviewFormValues) => {
      try {
        const res = await fetch(`${API_BASE_URL}/reviews`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(review),
          credentials: "include",
        });
        const data: CreateReviewResponse = await res.json();
        if (res.status === 201) {
          console.log("Review successfully created: " + data.reviewId);
          navigate("/reviews")
        } else {
          console.error("Review creation failed")
        }
      } catch (e) {
        console.error("Review patch failed: " + e);
      }
    };
  }

  useEffect(() => {
    if (!reviewId) return;

    const fetchReview = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Fetch failed");

        const data: ReviewFormValues = await res.json();
        setPrevReview(data);
      } catch (e) {
        console.error("Failed to fetch review:", e);
      }
    };

    fetchReview();
  }, [reviewId]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center my-6">
        {reviewId ? "レビュー編集" : "レビュー作成"}
      </h1>
      <ReviewForm 
        onSubmit={handleSubmit} 
        {...(prevReview ? { prevReview } : {})} 
      />
    </div>
  );
}

export default ReviewCreatePage;