package com.kotonekanno.movie_review.controller;

import com.kotonekanno.movie_review.dto.ReviewDTO;
import com.kotonekanno.movie_review.dto.ReviewListItemDTO;
import com.kotonekanno.movie_review.entity.User;
import com.kotonekanno.movie_review.form.ReviewForm;
import com.kotonekanno.movie_review.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
public class ReviewsController {

  private final ReviewService reviewService;

  public ReviewsController(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  // Create a review
  @PostMapping
  public ResponseEntity<Map<String, Long>> create(@AuthenticationPrincipal User user, @RequestBody ReviewForm form) {
    Long reviewId = reviewService.create(user, form);
    return ResponseEntity.status(201)
        .body(Map.of("reviewId", reviewId));
  }

  // Get a list of reviews
  @GetMapping
  public ResponseEntity<Map<String, List<ReviewListItemDTO>>> getAll(@AuthenticationPrincipal User user, @RequestParam int page) {
    List<ReviewListItemDTO> reviews = reviewService.getAll(user, page);

    return ResponseEntity.ok(Map.of("reviews", reviews));
  }

  // Get details of a review
  @GetMapping("/{movie_id}")
  public ResponseEntity<ReviewDTO> getDetails(@AuthenticationPrincipal User user, @PathVariable("movie_id") Long movieId) {
    return ResponseEntity.ok(reviewService.getDetails(user, movieId));
  }

  // Update a review


  // Delete a review
  @DeleteMapping("/{movie_id}")
  public ResponseEntity<Map<String, String>> delete(@AuthenticationPrincipal User user, @PathVariable("movie_id") Long movieId) {
    reviewService.delete(user, movieId);
    return ResponseEntity.noContent().build();
  }
}
