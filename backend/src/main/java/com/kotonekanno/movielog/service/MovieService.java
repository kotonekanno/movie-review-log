package com.kotonekanno.movielog.service;

import com.kotonekanno.movielog.dto.*;
import com.kotonekanno.movielog.entity.Movie;
import com.kotonekanno.movielog.entity.MovieDetails;
import com.kotonekanno.movielog.exception.ExternalApiException;
import com.kotonekanno.movielog.repository.MovieDetailsRepository;
import com.kotonekanno.movielog.repository.MovieRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class MovieService {

  private final MovieRepository movieRepository;
  private final MovieDetailsRepository movieDetailsRepository;
  private final TmdbApi tmdbApi;

  public MovieService(
      MovieRepository movieRepository,
      MovieDetailsRepository movieDetailsRepository,
      TmdbApi tmdbApi) {
    this.movieRepository = movieRepository;
    this.movieDetailsRepository = movieDetailsRepository;
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
  @Transactional
  public MovieDetailsDTO getDetails(Long tmdbId) {
    Movie movie = movieRepository.findByTmdbId(tmdbId)
        .orElse(null);

    if (movie == null) {
      return cacheAll(tmdbId);
    }

    MovieDetails details = movieDetailsRepository.findById(movie.getId())
        .orElse(null);

    if (details == null) {
      details = cacheDetails(tmdbId, movie);
    } else {
      LocalDateTime now = LocalDateTime.now();

      if (details.getExpiresAt().isBefore(now.plusDays(1))) {
        details.setExpiresAt(now.plusDays(7));
        movieDetailsRepository.save(details);
      }
    }

    return new MovieDetailsDTO(
        movie.getTmdbId(),
        movie.getJaTitle(),
        movie.getOriginalTitle(),
        movie.getPosterPath(),
        details.getGenres(),
        details.getProductionCountries(),
        details.getReleaseYear(),
        details.getRuntime()
    );
  }

  // Cache a movie and its details
  public MovieDetailsDTO cacheAll(Long tmdbId) {
    TmdbMovieDetailsDTO res;
    try {
      res = tmdbApi.getDetails(tmdbId);
    } catch (IOException e) {
      throw new ExternalApiException("TMDB API error", e);
    }

    Movie movie = new Movie();

    movie.setTmdbId(tmdbId);
    movie.setJaTitle(res.title());
    movie.setOriginalTitle(res.original_title());
    movie.setPosterPath(res.poster_path());

    movieRepository.save(movie);

    MovieDetails movieDetails = movieDetailsRepository.save(
        buildMovieDetails(movie, res)
    );

    return new MovieDetailsDTO(
        movie.getTmdbId(),
        movie.getJaTitle(),
        movie.getOriginalTitle(),
        movie.getPosterPath(),
        movieDetails.getGenres(),
        movieDetails.getProductionCountries(),
        movieDetails.getReleaseYear(),
        movieDetails.getRuntime()
    );
  }

  // Cache only details
  private MovieDetails cacheDetails(Long tmdbId, Movie movie) {
    TmdbMovieDetailsDTO res;
    try {
      res = tmdbApi.getDetails(tmdbId);
    } catch (IOException e) {
      throw new ExternalApiException("TMDB API error", e);
    }

    return movieDetailsRepository.save(
        buildMovieDetails(movie, res)
    );
  }

  private MovieDetails buildMovieDetails(Movie movie, TmdbMovieDetailsDTO res) {
    Integer releaseYear = null;
    if (res.release_date() != null && res.release_date().length() >= 4) {
      releaseYear = Integer.parseInt(res.release_date().substring(0, 4));
    }

    String[] genres = Arrays.stream(res.genres())
        .map(TmdbGenresDTO::name)
        .toArray(String[]::new);

    String[] countries = Arrays.stream(res.production_countries())
        .map(TmdbProductionCountriesDTO::name)
        .toArray(String[]::new);

    MovieDetails movieDetails = new MovieDetails();
    movieDetails.setMovie(movie);
    movieDetails.setExpiresAt(LocalDateTime.now().plusDays(7));
    movieDetails.setGenres(genres);
    movieDetails.setProductionCountries(countries);
    movieDetails.setReleaseYear(releaseYear);
    movieDetails.setRuntime(res.runtime());

    return movieDetails;
  }
}