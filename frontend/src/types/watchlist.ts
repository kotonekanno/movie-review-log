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
  movidId: number;
  note: string;
  priority: number;
}