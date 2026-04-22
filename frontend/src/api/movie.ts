import type { MovieDetails, MovieSearchResult } from "@/types/movie";
import { apiClient } from "./client";
import { ApiError } from "@/errors/ApiError";

export async function getMovieDetails(tmdbId: number): Promise<MovieDetails> {
  const res = await apiClient(`/movies/${tmdbId}`, {
    method: "GET",
  });

  if (res.status === 200) {
    return res.json();
  }

  throw new ApiError("TMDB API failed");
}

export async function searchMovie(query: string): Promise<MovieSearchResult> {
  const res = await apiClient(`/movies?query=${encodeURIComponent(query)}`, {
    method: "GET",
  });

  if (res.status === 200) {
    return res.json();
  }

  throw new ApiError("TMDB API failed");
}