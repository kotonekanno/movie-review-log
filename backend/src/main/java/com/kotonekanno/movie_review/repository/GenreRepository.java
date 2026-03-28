package com.kotonekanno.movie_review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movie_review.entity.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
