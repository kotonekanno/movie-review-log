package com.kotonekanno.movielog.service;

import com.kotonekanno.movielog.dto.*;
import com.kotonekanno.movielog.entity.Movie;
import com.kotonekanno.movielog.entity.Review;
import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.exception.AccessDeniedException;
import com.kotonekanno.movielog.exception.NotFoundException;
import com.kotonekanno.movielog.form.ReviewForm;
import com.kotonekanno.movielog.repository.MovieRepository;
import com.kotonekanno.movielog.repository.ReviewRepository;
import com.kotonekanno.movielog.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ReviewService {

  private final ReviewRepository reviewRepository;
  private final UserRepository userRepository;
  private final MovieRepository movieRepository;
  private final MovieService movieService;

  public ReviewService(
      ReviewRepository reviewRepository,
      UserRepository userRepository,
      MovieRepository movieRepository,
      MovieService movieService
  ) {
    this.reviewRepository = reviewRepository;
    this.userRepository = userRepository;
    this.movieRepository = movieRepository;
    this.movieService = movieService;
  }

  // Create a review
  @Transactional
  public Integer create(UserDetails userDetails, ReviewForm form) {
    Review review = new Review();
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));

    review.setUser(user);
    review.setTmdbId(form.getTmdbId());
    review.setText(form.getText());
    review.setScore(form.getScore());
    review.setWatchedAt(form.getWatchedAt());

    return reviewRepository.save(review).getId();
  }

  // Get a list of reviews
  @Transactional(readOnly = true)
  public ReviewListResponseDTO getAll(
      UserDetails userDetails,
      int page,
      ReviewSort sort,
      Sort.Direction order
  ) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));

    int pageSize = 12;
    int safePage = Math.max(page, 1);

    Pageable pageable = PageRequest.of(
        safePage - 1,
        pageSize,
        Sort.by(order, sort.getJpaField())
    );

    Page<ReviewListItemDTO> result = reviewRepository.findReviewListDTOs(user.getId(), pageable);

    return new ReviewListResponseDTO(
        result.getContent(),
        result.getTotalPages()
    );
  }

  // Get details of a review
  // needs verification
  @Transactional(readOnly = true)
  public ReviewDetailsDTO getDetails(UserDetails userDetails, Integer reviewId) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));

    Review review = reviewRepository
        .findByIdAndDeletedAtIsNull(reviewId)
        .orElseThrow(() -> new NotFoundException("Review not found"));

    if (!review.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to view this review");
    }

    MovieDetailsDTO movie = movieService.getDetails(review.getTmdbId());

    return new ReviewDetailsDTO(
        review.getId(),
        review.getScore(),
        review.getText(),
        review.getWatchedAt(),
        movie
    );
  }

  // Update a review
  // needs verification
  @Transactional
  public void update(UserDetails userDetails, Integer reviewId, ReviewForm form) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new NotFoundException("Review not found"));

    if (!review.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to update this review");
    }

    if (form.getTmdbId() != null) {
      review.setTmdbId(form.getTmdbId());
    }

    if (form.getText() != null) {
      review.setText(form.getText());
    }
    if (form.getScore() != null) {
      review.setScore(form.getScore());
    }
    if (form.getWatchedAt() != null) {
      review.setWatchedAt(form.getWatchedAt());
    }

    reviewRepository.save(review);
  }

  // Delete a review
  // needs verification
  @Transactional
  public void delete(UserDetails userDetails, Integer reviewId) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    Review review = reviewRepository
        .findById(reviewId)
        .orElseThrow(() -> new NotFoundException("Review not found"));

    if (!review.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to delete this review");
    }

    review.setDeletedAt(LocalDateTime.now());
    reviewRepository.save(review);
  }
}
