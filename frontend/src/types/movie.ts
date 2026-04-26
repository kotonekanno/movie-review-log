import { countryMap } from "@/constants/countries";

type CountryCode = keyof typeof countryMap;
export interface MovieOverview {
  tmdbId: number;
  jaTitle: string;
  originalTitle: string;
  posterPath: string;
}

export interface MovieSearchResult {
  results: MovieOverview[];
}

export interface MovieDetails {
  tmdbId: number;
  jaTitle: string;
  originalTitle: string;
  posterPath: string;
  genres: Array<string>;
  productionCountries: Array<CountryCode>;
  releaseYear: number;
  runtime: number;
}