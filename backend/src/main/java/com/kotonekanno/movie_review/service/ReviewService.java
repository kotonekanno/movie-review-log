package com.kotonekanno.movie_review.service;

import com.kotonekanno.movie_review.dto.ReviewDTO;
import com.kotonekanno.movie_review.dto.ReviewListItemDTO;
import com.kotonekanno.movie_review.entity.Movie;
import com.kotonekanno.movie_review.entity.Review;
import com.kotonekanno.movie_review.entity.User;
import com.kotonekanno.movie_review.exception.AccessDeniedException;
import com.kotonekanno.movie_review.exception.NotFoundException;
import com.kotonekanno.movie_review.form.ReviewForm;
import com.kotonekanno.movie_review.repository.MovieRepository;
import com.kotonekanno.movie_review.repository.ReviewRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

  private final ReviewRepository reviewRepository;
  private final MovieRepository movieRepository;

  public ReviewService(ReviewRepository reviewRepository, MovieRepository movieRepository) {
    this.reviewRepository = reviewRepository;
    this.movieRepository = movieRepository;
  }

  // Create a review
  @Transactional
  public Long create(User user, ReviewForm form) {
    Review review = new Review();
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
  public List<ReviewListItemDTO> getAll(User user, int page) {
    int pageSize = 10;
    int safePage = Math.max(page, 1);

    Pageable pageable = PageRequest.of(
        safePage - 1,
        pageSize,
        Sort.by(Sort.Direction.DESC, "createdAt")   // 選択肢化
    );

    return reviewRepository.findReviewListDTOs(user.getId(), pageable);
  }

  // Get details of a review
  // needs verification
  @Transactional(readOnly = true)
  public ReviewDTO getDetails(User user, Long reviewId) {
    Review review = reviewRepository
        .findById(reviewId)
        .orElseThrow(() -> new NotFoundException("Review not found"));

    if (!review.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to view this review");
    }

    return new ReviewDTO(
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
  public ReviewDTO update(User user, Long reviewId, ReviewForm form) {
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
  public void delete(User user, Long reviewId) {
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
