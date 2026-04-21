package com.kotonekanno.movielog.repository;

import com.kotonekanno.movielog.dto.MovieDetailsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movielog.entity.Movie;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

  @Query("""
      SELECT new com.kotonekanno.movielog.dto.MovieDetailsDTO(
        m.tmdbId,
        m.jaTitle,
        m.originalTitle,
        m.posterPath,
        d.genres,
        d.productionCountries,
        d.releaseYear,
        d.runtime
      )
      FROM MovieDetails d
      JOIN d.movie m
      WHERE m.tmdbId = :tmdbId
      """)
  Optional<MovieDetailsDTO> findMovieDetailsDTOByTmdbId(@Param("tmdbId") Long tmdbId);

  Optional<Movie> findByTmdbId(Long tmdbId);
}
