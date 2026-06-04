package com.kotonekanno.movielog.repository;

import com.kotonekanno.movielog.dto.review.ReviewListItem;
import com.kotonekanno.movielog.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movielog.entity.Review;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

  @Query("""
    SELECT new com.kotonekanno.movielog.dto.review.ReviewListItem(
        r.id,
        m.jaTitle,
        m.posterPath,
        r.score
    )
    FROM Review r
    JOIN Movie m ON r.tmdbId = m.tmdbId
    WHERE r.user.id = :userId AND r.deletedAt IS NULL
  """)
  Page<ReviewListItem> findReviewListDTOs(
      @Param("userId") Integer userId,
      Pageable pageable
  );

  Optional<Review> findByIdAndDeletedAtIsNull(Integer id);

  int countByUser(User user);

  @Query("""
    SELECT COUNT(r)
    FROM Review r
    WHERE r.user = :user
      AND MONTH(r.createdAt) = :month
      AND YEAR(r.createdAt) = YEAR(CURRENT_DATE)
  """)
  int countInCurrentMonth(User user, int month);

  @Query("""
    SELECT AVG(r.score)
    FROM Review r
    WHERE r.user = :user
  """)
  Optional<Double> getAverageScoreByUser(User user);

  @Query("""
    SELECT MONTH(r.createdAt), COUNT(r)
    FROM Review r
    WHERE r.user = :user
      AND YEAR(r.createdAt) = :year
    GROUP BY MONTH(r.createdAt)
    ORDER BY MONTH(r.createdAt)
  """)
  List<Object[]> countPerMonth(
      User user,
      int year
  );
}