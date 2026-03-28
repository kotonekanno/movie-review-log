package com.kotonekanno.movie_review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movie_review.entity.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
