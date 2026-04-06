package com.kotonekanno.movielog.controller;

import com.kotonekanno.movielog.dto.ReviewDTO;
import com.kotonekanno.movielog.dto.ReviewListItemDTO;
import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.form.ReviewForm;
import com.kotonekanno.movielog.service.ReviewService;
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
  // returns 201 Created
  @PostMapping
  public ResponseEntity<Map<String, Long>> create(
      @AuthenticationPrincipal User user,
      @RequestBody ReviewForm form
  ) {
    Long reviewId = reviewService.create(user, form);
    return ResponseEntity.status(201)
        .body(Map.of("reviewId", reviewId));
  }

  // Get a list of reviews
  // return 200 OK
  @GetMapping
  public ResponseEntity<Map<String, List<ReviewListItemDTO>>> getAll(
      @AuthenticationPrincipal User user,
      @RequestParam int page
  ) {
    List<ReviewListItemDTO> reviews = reviewService.getAll(user, page);

    return ResponseEntity.ok(Map.of("reviews", reviews));
  }

  // Get details of a review
  // returns 200 OK
  @GetMapping("/{review_id}")
  public ResponseEntity<ReviewDTO> getDetails(
      @AuthenticationPrincipal User user,
      @PathVariable("review_id") Long reviewId
  ) {
    return ResponseEntity.ok(reviewService.getDetails(user, reviewId));
  }

  // Update a review
  // returns 200 OK
  @PatchMapping("/{review_id}")
  public ResponseEntity<ReviewDTO> update(
      @AuthenticationPrincipal User user,
      @PathVariable("review_id") Long reviewId,
      @RequestBody ReviewForm form
  ) {
    ReviewDTO updatedReview = reviewService.update(user, reviewId, form);
    return ResponseEntity.ok(updatedReview);
  }

  // Delete a review
  // returns 204 No Content
  @DeleteMapping("/{review_id}")
  public ResponseEntity<Void> delete(
      @AuthenticationPrincipal User user,
      @PathVariable("review_id") Long reviewId
  ) {
    reviewService.delete(user, reviewId);
    return ResponseEntity.noContent().build();  // No content
  }
}
