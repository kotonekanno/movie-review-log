package com.kotonekanno.movie_review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movie_review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}