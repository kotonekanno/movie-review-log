package com.kotonekanno.movie_review.controller;

import com.kotonekanno.movie_review.dto.MovieDetailsDTO;
import com.kotonekanno.movie_review.dto.MovieSearchResultDTO;
import com.kotonekanno.movie_review.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movie")
public class MovieController {

  private final MovieService movieService;

  public MovieController(MovieService movieService) {
    this.movieService = movieService;
  }

  // Search movies with a query
  @GetMapping
  public ResponseEntity<List<MovieSearchResultDTO>> search(@RequestParam String query) {
    return ResponseEntity.ok(movieService.search(query));
  }
  
  // Get details of a movie
  @GetMapping("/{tmdb_id}")
  public ResponseEntity<MovieDetailsDTO> getDetails(@PathVariable("tmdb_id") Long tmdbId) {
     return ResponseEntity.ok(movieService.getDetails(tmdbId));
  }
}
