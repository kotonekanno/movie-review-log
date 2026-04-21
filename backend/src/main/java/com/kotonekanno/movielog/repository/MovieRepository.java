package com.kotonekanno.movielog.repository;

import com.kotonekanno.movielog.dto.movie.MovieDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movielog.entity.Movie;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

  Optional<Movie> findByTmdbId(Long tmdbId);
}
