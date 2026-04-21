package com.kotonekanno.movielog.controller;

import com.kotonekanno.movielog.dto.ReviewDetailsDTO;
import com.kotonekanno.movielog.dto.ReviewListResponseDTO;
import com.kotonekanno.movielog.dto.ReviewSort;
import com.kotonekanno.movielog.form.ReviewForm;
import com.kotonekanno.movielog.service.ReviewService;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
      @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody ReviewForm form
  ) {
    Integer reviewId = reviewService.create(userDetails, form);
    return ResponseEntity.status(201)
        .body(Map.of("reviewId", reviewId));
  }

  // Get a list of reviews
  // return 200 OK
  @GetMapping
  public ResponseEntity<ReviewListResponseDTO> getAll(
      @AuthenticationPrincipal UserDetails userDetails,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "createdAt") ReviewSort sort,
      @RequestParam(defaultValue = "desc") Sort.Direction order
  ) {
    return ResponseEntity.ok(reviewService.getAll(userDetails, page, sort, order));
  }

  // Get details of a review
  // returns 200 OK
  @GetMapping("/{review_id}")
  public ResponseEntity<ReviewDetailsDTO> getDetails(
      @AuthenticationPrincipal UserDetails userDetails,
      @PathVariable("review_id") Integer reviewId
  ) {
    return ResponseEntity.ok(reviewService.getDetails(userDetails, reviewId));
  }

  // Update a review
  // returns 204 No Content
  @PatchMapping("/{review_id}")
  public ResponseEntity<Void> update(
      @AuthenticationPrincipal UserDetails userDetails,
      @PathVariable("review_id") Integer reviewId,
      @RequestBody ReviewForm form
  ) {
    reviewService.update(userDetails, reviewId, form);
    return ResponseEntity.noContent().build();
  }

  // Delete a review
  // returns 204 No Content
  @DeleteMapping("/{review_id}")
  public ResponseEntity<Void> delete(
      @AuthenticationPrincipal UserDetails userDetails,
      @PathVariable("review_id") Integer reviewId
  ) {
    reviewService.delete(userDetails, reviewId);
    return ResponseEntity.noContent().build();  // No content
  }
}
