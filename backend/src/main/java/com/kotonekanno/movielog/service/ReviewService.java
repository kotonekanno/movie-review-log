package com.kotonekanno.movielog.service;

import com.kotonekanno.movielog.dto.ReviewDTO;
import com.kotonekanno.movielog.dto.ReviewListItemDTO;
import com.kotonekanno.movielog.dto.ReviewListResponseDTO;
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
import java.util.List;

@Service
public class ReviewService {

  private final ReviewRepository reviewRepository;
  private final UserRepository userRepository;
  private final MovieRepository movieRepository;

  public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository, MovieRepository movieRepository) {
    this.reviewRepository = reviewRepository;
    this.userRepository = userRepository;
    this.movieRepository = movieRepository;
  }

  // Create a review
  @Transactional
  public Long create(UserDetails userDetails, ReviewForm form) {
    Review review = new Review();
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    Movie movie = movieRepository.findById(form.getMovieId())
        .orElseThrow(() -> new NotFoundException("Movie not found"));

    review.setUser(user);
    review.setMovie(movie);
    review.setText(form.getText());
    review.setScore(form.getScore());
    review.setWatchedAt(form.getWatchedAt());

    return reviewRepository.save(review).getId();
  }

  // Get a list of reviews
  @Transactional(readOnly = true)
  public ReviewListResponseDTO getAll(UserDetails userDetails, int page) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));

    int pageSize = 12;
    int safePage = Math.max(page, 1);

    Pageable pageable = PageRequest.of(
        safePage - 1,
        pageSize,
        Sort.by(Sort.Direction.DESC, "createdAt")   // 選択肢化
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
  public ReviewDTO getDetails(UserDetails userDetails, Long reviewId) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));

    Review review = reviewRepository
        .findById(reviewId)
        .orElseThrow(() -> new NotFoundException("Review not found"));

    if (!review.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to view this review");
    }

    return new ReviewDTO(
        review.getId(),
        review.getMovie().getJaTitle(),
        review.getMovie().getOriginalTitle(),
        review.getMovie().getReleaseYear(),
        review.getMovie().getPosterPath(),
        review.getScore(),
        review.getText(),
        review.getWatchedAt()
    );
  }

  // Update a review
  // needs verification
  @Transactional
  public ReviewDTO update(UserDetails userDetails, Long reviewId, ReviewForm form) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    Review review = reviewRepository.findById(reviewId)
        .orElseThrow(() -> new NotFoundException("Review not found"));

    if (!review.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to update this review");
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

    Review updated = reviewRepository.save(review);

    return new ReviewDTO(
        updated.getId(),
        updated.getMovie().getJaTitle(),
        updated.getMovie().getOriginalTitle(),
        updated.getMovie().getReleaseYear(),
        updated.getMovie().getPosterPath(),
        updated.getScore(),
        updated.getText(),
        updated.getWatchedAt()
    );
  }

  // Delete a review
  // needs verification
  @Transactional
  public void delete(UserDetails userDetails, Long reviewId) {
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
