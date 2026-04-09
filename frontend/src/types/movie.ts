export interface Movie {
  tmdbId: number;
  jaTitle: string;
  originalTitle: string;
  posterPath: string;
}

export interface MovieDetails {
  movieId: number;
  jaTitle: string;
  originalTitle: string;
  releaseYear?: number;
  posterPath: string;
}