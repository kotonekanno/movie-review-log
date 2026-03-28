package com.kotonekanno.movie_review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movie_review.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
