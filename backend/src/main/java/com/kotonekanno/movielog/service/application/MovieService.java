package com.kotonekanno.movielog.service.application;

import com.kotonekanno.movielog.dto.external.tmdb.*;
import com.kotonekanno.movielog.dto.movie.MovieDetails;
import com.kotonekanno.movielog.dto.movie.MovieOverview;
import com.kotonekanno.movielog.entity.Movie;
import com.kotonekanno.movielog.exception.custom.ExternalApiException;
import com.kotonekanno.movielog.repository.MovieDetailsRepository;
import com.kotonekanno.movielog.repository.MovieRepository;
import com.kotonekanno.movielog.service.external.TmdbClient;
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
  private final TmdbClient tmdbClient;

  public MovieService(
      MovieRepository movieRepository,
      MovieDetailsRepository movieDetailsRepository,
      TmdbClient tmdbClient) {
    this.movieRepository = movieRepository;
    this.movieDetailsRepository = movieDetailsRepository;
    this.tmdbClient = tmdbClient;
  }

  // Search a movie on TMDB
  public List<MovieOverview> search(String query) {
    MovieSearchResponse response;

    try {
      response = tmdbClient.search(query);
    } catch (IOException e) {
      throw new ExternalApiException("TMDB API error", e);
    }

    return response.results().stream()
        .map(this::toSearchResultDto)
        .toList();
  }

  private MovieOverview toSearchResultDto(MovieSearchResultItem movie) {
    return new MovieOverview(
        movie.id(),
        movie.title(),
        movie.original_title(),
        movie.poster_path()
    );
  }

  // Get details of a movie
  @Transactional
  public MovieDetails getDetails(Long tmdbId) {
    Movie movie = movieRepository.findByTmdbId(tmdbId)
        .orElse(null);

    if (movie == null) {
      return cacheAll(tmdbId);
    }

    com.kotonekanno.movielog.entity.MovieDetails details = movieDetailsRepository.findById(movie.getId())
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

    return new MovieDetails(
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
  public MovieDetails cacheAll(Long tmdbId) {
    MovieDetailsResponse res;
    try {
      res = tmdbClient.getDetails(tmdbId);
    } catch (IOException e) {
      throw new ExternalApiException("TMDB API error", e);
    }

    Movie movie = new Movie();

    movie.setTmdbId(tmdbId);
    movie.setJaTitle(res.title());
    movie.setOriginalTitle(res.original_title());
    movie.setPosterPath(res.poster_path());

    movieRepository.save(movie);

    com.kotonekanno.movielog.entity.MovieDetails movieDetails = movieDetailsRepository.save(
        buildMovieDetails(movie, res)
    );

    return new MovieDetails(
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
  private com.kotonekanno.movielog.entity.MovieDetails cacheDetails(Long tmdbId, Movie movie) {
    MovieDetailsResponse res;
    try {
      res = tmdbClient.getDetails(tmdbId);
    } catch (IOException e) {
      throw new ExternalApiException("TMDB API error", e);
    }

    return movieDetailsRepository.save(
        buildMovieDetails(movie, res)
    );
  }

  private com.kotonekanno.movielog.entity.MovieDetails buildMovieDetails(Movie movie, MovieDetailsResponse res) {
    Integer releaseYear = null;
    if (res.release_date() != null && res.release_date().length() >= 4) {
      releaseYear = Integer.parseInt(res.release_date().substring(0, 4));
    }

    String[] genres = Arrays.stream(res.genres())
        .map(Genre::name)
        .toArray(String[]::new);

    String[] countries = Arrays.stream(res.production_countries())
        .map(ProductionCountry::name)
        .toArray(String[]::new);

    com.kotonekanno.movielog.entity.MovieDetails movieDetails = new com.kotonekanno.movielog.entity.MovieDetails();
    movieDetails.setMovie(movie);
    movieDetails.setExpiresAt(LocalDateTime.now().plusDays(7));
    movieDetails.setGenres(genres);
    movieDetails.setProductionCountries(countries);
    movieDetails.setReleaseYear(releaseYear);
    movieDetails.setRuntime(res.runtime());

    return movieDetails;
  }
}