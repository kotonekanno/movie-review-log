package com.kotonekanno.movie_review.service;

import com.kotonekanno.movie_review.dto.*;
import com.kotonekanno.movie_review.entity.Movie;
import com.kotonekanno.movie_review.exception.ExternalApiException;
import com.kotonekanno.movie_review.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MovieService {

  private final MovieRepository movieRepository;
  private final TmdbApi tmdbApi;

  public MovieService(MovieRepository movieRepository, TmdbApi tmdbApi) {
    this.movieRepository = movieRepository;
    this.tmdbApi = tmdbApi;
  }

  // Search a movie on TMDB
  public List<MovieSearchResultDTO> search(String query) {
    TmdbSearchResponseDTO response;

    try {
      response = tmdbApi.search(query);
    } catch (IOException e) {
      throw new ExternalApiException("TMDB API error", e);
    }

    return response.results().stream()
        .map(this::toSearchResultDto)
        .toList();
  }

  private MovieSearchResultDTO toSearchResultDto(TmdbSearchResultDTO movie) {
    return new MovieSearchResultDTO(
        movie.id(),
        movie.title(),
        movie.original_title(),
        movie.poster_path()
    );
  }

  // Get details of a movie
  public MovieDetailsDTO getDetails(Long tmdbId) {
    return movieRepository.findMovieDetailsDTOByTmdbId(tmdbId)
        .orElseGet(() -> fetchDetails(tmdbId));
  }

  // Fetch details of a movie from TMDB
  public MovieDetailsDTO fetchDetails(Long tmdbId) {
    TmdbMovieDetailsDTO response;

    try {
      response = tmdbApi.getDetails(tmdbId);
    } catch (IOException e) {
      throw new ExternalApiException("TMDB API error", e);
    }

    MovieDetailsDTO dto = toMovieDetailsDto(response);
    cache(tmdbId, dto);

    return dto;
  }

  private MovieDetailsDTO toMovieDetailsDto(TmdbMovieDetailsDTO movie) {
    Integer releaseYear = null;

    if (movie.release_date() != null && movie.release_date().length() >= 4) {
      releaseYear = Integer.parseInt(movie.release_date().substring(0, 4));
    }

    return new MovieDetailsDTO(
        movie.title(),
        movie.original_title(),
        releaseYear,
        movie.poster_path()
    );
  }

  // Cache a movie
  private void cache(Long tmdbId, MovieDetailsDTO dto) {
    Movie movie = new Movie();

    movie.setTmdbId(tmdbId);
    movie.setJaTitle(dto.jaTitle());
    movie.setOriginalTitle(dto.originalTitle());
    movie.setPosterPath(dto.posterPath());
    movie.setReleaseYear(dto.releaseYear());

    movieRepository.save(movie);
  }
}