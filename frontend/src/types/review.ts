export interface Review {
  reviewId: number;
  title: string;
  posterPath: string;
  score: number;
}

export interface ReviewDetails {
  reviewId: number;
  jaTitle: string;
  originalTitle: string;
  releaseYear: number;
  posterPath: string;
  score: number;
  text: string;
  watchedAt: string;
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
