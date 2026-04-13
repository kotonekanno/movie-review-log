import type { MovieDetails } from "./movie";

export interface WatchlistItem {
  watchlistId: number;
  isWatched: boolean;
  priority: number;
  note: string;
  movie: MovieDetails;
}


export interface WatchlistFormValues {
  movieId: number;
  note: string;
  priority: number;
}

export interface FetchWatchlistResponse {
  watchlist: WatchlistItem[];
  watched: number;
}


export interface CreateWatchlistResponse {
  watchlistId: number;
}
