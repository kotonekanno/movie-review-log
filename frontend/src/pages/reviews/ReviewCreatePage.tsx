import { useNavigate } from "react-router-dom";

import ReviewForm from "../../components/form/ReviewForm";
import type { ReviewFormValues } from "@/types/review";

interface CreateReviewResponse {
  reviewId: number;
}

function ReviewCreatePage() {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (review: ReviewFormValues) => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
      });
      const data: CreateReviewResponse = await res.json();
      if (res.status === 201) {
        alert("Review successfully created: " + data.reviewId);
        navigate("/reviews")
      } else {
        alert("Review creation failed")
      }
    } catch (e) {
      console.error(e);
      alert("Error occured");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center my-6">レビュー作成</h1>
      <ReviewForm onSubmit={handleSubmit} />
    </div>
  );
}

export default ReviewCreatePage;