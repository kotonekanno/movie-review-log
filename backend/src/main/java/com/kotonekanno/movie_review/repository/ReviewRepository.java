package com.kotonekanno.movie_review.repository;

import com.kotonekanno.movie_review.dto.ReviewDTO;
import com.kotonekanno.movie_review.dto.ReviewListItemDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movie_review.entity.Review;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

  @Query("""
        SELECT new com.kotonekanno.movie_review.dto.ReviewListItemDTO(
          m.jaTitle,
          m.posterPath,
          r.score
        )
        FROM Review r
        JOIN r.movie m
        WHERE r.user.id = :userId
      """)
  List<ReviewListItemDTO> findReviewListDTOs(@Param("userId") Long userId, Pageable pageable);

  @Query("""
        SELECT new com.kotonekanno.movie_review.dto.ReviewDTO(
          m.jaTitle,
          m.originalTitle,
          m.releaseYear,
          m.posterPath,
          r.score,
          r.text,
          r.watchedAt
        )
        FROM Review r, MovieGenre mg
        JOIN r.movie m
        WHERE r.user.id = :userId AND r.movie.id = :movieId
      """)
  Optional<ReviewDTO> findReviewDTOById(@Param("userId") Long userId, @Param("movieId") Long movieId);

  Optional<Review> findByUserIdAndMovieId(Long userId, Long movieId);
}