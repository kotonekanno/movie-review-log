package com.kotonekanno.movie_review.service;

import com.kotonekanno.movie_review.entity.User;
import com.kotonekanno.movie_review.exception.AlreadyExistsException;
import com.kotonekanno.movie_review.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public User register(String email, String rawPassword) {
    if (userRepository.findByEmail(email).isPresent()) {
      throw new AlreadyExistsException("Email already exists: " + email);
    }

    String encoded = passwordEncoder.encode(rawPassword);

    User user = new User();
    user.setEmail(email);
    user.setPasswordHash(encoded);
    user.setCreatedAt(LocalDateTime.now());

    return userRepository.save(user);
  }
}
