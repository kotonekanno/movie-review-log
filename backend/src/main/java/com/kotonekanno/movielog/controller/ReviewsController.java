package com.kotonekanno.movielog.controller;

import com.kotonekanno.movielog.dto.review.ReviewDetailsResponse;
import com.kotonekanno.movielog.dto.review.ReviewListResponse;
import com.kotonekanno.movielog.enums.ReviewSort;
import com.kotonekanno.movielog.dto.review.ReviewForm;
import com.kotonekanno.movielog.service.application.ReviewService;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
  public ResponseEntity<Map<String, Integer>> create(
      @AuthenticationPrincipal String userId,
      @RequestBody ReviewForm form
  ) {
    Integer reviewId = reviewService.create(Integer.parseInt(userId), form);
    return ResponseEntity.status(201)
        .body(Map.of("reviewId", reviewId));
  }

  // Get a list of reviews
  // return 200 OK
  @GetMapping
  public ResponseEntity<ReviewListResponse> getAll(
      @AuthenticationPrincipal String userId,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "createdAt") ReviewSort sort,
      @RequestParam(defaultValue = "desc") Sort.Direction order
  ) {
    return ResponseEntity.ok(reviewService.getAll(Integer.parseInt(userId), page, sort, order));
  }

  // Get details of a review
  // returns 200 OK
  @GetMapping("/{review_id}")
  public ResponseEntity<ReviewDetailsResponse> getDetails(
      @AuthenticationPrincipal String userId,
      @PathVariable("review_id") Integer reviewId
  ) {
    return ResponseEntity.ok(reviewService.getDetails(Integer.parseInt(userId), reviewId));
  }

  // Update a review
  // returns 204 No Content
  @PatchMapping("/{review_id}")
  public ResponseEntity<Void> update(
      @AuthenticationPrincipal String userId,
      @PathVariable("review_id") Integer reviewId,
      @RequestBody ReviewForm form
  ) {
    reviewService.update(Integer.parseInt(userId), reviewId, form);
    return ResponseEntity.noContent().build();
  }

  // Delete a review
  // returns 204 No Content
  @DeleteMapping("/{review_id}")
  public ResponseEntity<Void> delete(
      @AuthenticationPrincipal String userId,
      @PathVariable("review_id") Integer reviewId
  ) {
    reviewService.delete(Integer.parseInt(userId), reviewId);
    return ResponseEntity.noContent().build();
  }
}
