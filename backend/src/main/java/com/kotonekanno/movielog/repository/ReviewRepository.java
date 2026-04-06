package com.kotonekanno.movielog.repository;

import com.kotonekanno.movielog.dto.ReviewListItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movielog.entity.Review;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

  @Query("""
        SELECT new com.kotonekanno.movielog.dto.ReviewListItemDTO(
          r.id,
          m.jaTitle,
          m.posterPath,
          r.score
        )
        FROM Review r
        JOIN r.movie m
        WHERE r.user.id = :userId AND r.deletedAt IS NULL
      """)
  Page<ReviewListItemDTO> findReviewListDTOs(@Param("userId") Long userId, Pageable pageable);
}