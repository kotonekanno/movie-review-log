package com.kotonekanno.movielog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movielog.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByEmail(String email);
}
