import type { MovieDetails } from "./movie";

export interface Review {
  reviewId: number;
  title: string;
  posterPath: string;
  score: number;
}

export interface ReviewDetails {
  reviewId: number;
  score: number;
  text: string;
  watchedAt: string;
  movie: MovieDetails;
}

export interface ReviewFormValues {
  movieId: number;
  text: string;
  score: number;
  watchedAt: string;
}

export interface ReviewListResponse {
  reviews: Review[];
  totalPages: number;
}


export interface CreateReviewResponse {
  reviewId: number;
}
