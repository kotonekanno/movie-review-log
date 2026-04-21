package com.kotonekanno.movielog.repository;

import com.kotonekanno.movielog.entity.MovieDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface MovieDetailsRepository extends JpaRepository<MovieDetails, Integer> {
  @Modifying
  @Query(
    value = """
      DELETE FROM movie_details
      WHERE movie_id IN (
        SELECT movie_id FROM movie_details
        WHERE expires_at < :now
        LIMIT :limit
      )
    """,
    nativeQuery = true
  )
  void deleteExpired(@Param("now") LocalDateTime now, @Param("limit") int limit);
}
