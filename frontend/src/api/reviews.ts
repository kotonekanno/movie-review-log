import type { ReviewDetails, ReviewFormValues, ReviewListResponse } from "@/types/review";
import type { SortKey, Order } from "@/types/query";
import { apiClient } from "./client";
import { ApiError } from "@/errors/ApiError";

export async function getReviewDetails(reviewId: string): Promise<ReviewDetails> {
  const res = await apiClient(`/reviews/${reviewId}`, {
    method: "GET",
  });

  if (res.status === 200) {
    return res.json();
  }

  throw new ApiError("GET /reviews/reviewId failed");
}

export async function deleteReview(reviewId: string): Promise<void> {
  const res = await apiClient(`/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.status === 204) {
    return;
  }

  throw new ApiError("DEELTE /reviews/reviewId failed");
}

export async function createReview(review: ReviewFormValues): Promise<void> {
  const res = await apiClient("/reviews", {
    method: "POST",
    body: JSON.stringify(review),
  });

  if (res.status === 201) {
    return;
  }

  throw new ApiError("POST /reviews failed");
}

export async function editReview(reviewId: string, payload: Partial<ReviewFormValues>): Promise<void> {
  const res = await apiClient(`/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (res.status === 204) {
    return;
  }

  throw new ApiError("PATCH /reviews/reviewId failed");
}

export async function getReviewList(page: number, sortKey: SortKey, order: Order): Promise<ReviewListResponse> {
  const res = await apiClient(`/reviews?page=${page}&sort=${sortKey}&order=${order}`, {
    method: "GET",
  });

  if (res.status === 200) {
    return res.json();
  }

  throw new ApiError("GET /reviews failed");
}