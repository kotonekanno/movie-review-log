package com.kotonekanno.movie_review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movie_review.entity.MovieGenre;

public interface MovieGenreRepository extends JpaRepository<MovieGenre, Long> {
}
