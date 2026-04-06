package com.kotonekanno.movielog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movielog.entity.MovieGenre;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieGenreRepository extends JpaRepository<MovieGenre, Long> {
}
