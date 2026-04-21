export interface Movie {
  tmdbId: number;
  jaTitle: string;
  originalTitle: string;
  posterPath: string;
}

export interface MovieDetails {
  tmdbId: number;
  jaTitle: string;
  originalTitle: string;
  posterPath: string;
  genres: Array<string>;
  productionCountries: Array<string>;
  releaseYear: number;
  runtime: number;
}