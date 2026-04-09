package com.kotonekanno.movielog.service;

import com.kotonekanno.movielog.dto.*;
import com.kotonekanno.movielog.entity.Movie;
import com.kotonekanno.movielog.exception.ExternalApiException;
import com.kotonekanno.movielog.exception.NotFoundException;
import com.kotonekanno.movielog.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

  // Fetch details of a movie
  public MovieDetailsDTO fetchDetails(Long tmdbId) {
    Optional<Movie> optionalMovie = movieRepository.findByTmdbId(tmdbId);

    if (optionalMovie.isPresent()) {
      Movie movie = optionalMovie.get();
      return new MovieDetailsDTO(
        movie.getId(),
        movie.getJaTitle(),
        movie.getOriginalTitle(),
        movie.getReleaseYear(),
        movie.getPosterPath()
      );
    }

    TmdbMovieDetailsDTO response;
    try {
      response = tmdbApi.getDetails(tmdbId);
    } catch (IOException e) {
      throw new ExternalApiException("TMDB API error", e);
    }

    Movie movie = cache(tmdbId, response);

    return new MovieDetailsDTO(
      movie.getId(),
      movie.getJaTitle(),
      movie.getOriginalTitle(),
      movie.getReleaseYear(),
      movie.getPosterPath()
    );
  }

  // Cache a movie
  private Movie cache(Long tmdbId, TmdbMovieDetailsDTO res) {
    Movie movie = new Movie();
    Integer releaseYear = null;

    if (res.release_date() != null && res.release_date().length() >= 4) {
      releaseYear = Integer.parseInt(res.release_date().substring(0, 4));
    }

    movie.setTmdbId(tmdbId);
    movie.setJaTitle(res.title());
    movie.setOriginalTitle(res.original_title());
    movie.setPosterPath(res.poster_path());
    movie.setReleaseYear(releaseYear);

    return movieRepository.save(movie);
  }
}