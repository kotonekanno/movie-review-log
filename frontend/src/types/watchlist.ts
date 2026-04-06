export interface WatchlistItem {
  watchlistId: number;
  jaTitle: string;
  originalTitle: string;
  posterPath: string;
  isWatched: boolean;
  priority: number;
  note: string;
}


export interface WatchlistFormValues {
  movieId: number;
  note: string;
  priority: number;
}