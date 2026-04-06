package com.kotonekanno.movielog.repository;

import com.kotonekanno.movielog.dto.MovieDetailsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movielog.entity.Movie;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

  @Query("""
      SELECT new com.kotonekanno.movie_review.dto.MovieDetailsDTO(
        m.id,
        m.jaTitle,
        m.originalTitle,
        m.releaseYear,
        m.posterPath
      )
      FROM Movie m
      WHERE m.id = :tmdbId
      """)
  Optional<MovieDetailsDTO> findMovieDetailsDTOByTmdbId(@Param("tmdbId") Long tmdbId);
}
