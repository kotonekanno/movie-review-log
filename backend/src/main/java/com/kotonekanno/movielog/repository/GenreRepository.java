package com.kotonekanno.movielog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movielog.entity.Genre;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
}
