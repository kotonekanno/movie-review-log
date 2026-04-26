package com.kotonekanno.movielog.service.application;

import com.kotonekanno.movielog.dto.auth.LoginResponse;
import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.exception.custom.AlreadyExistsException;
import com.kotonekanno.movielog.exception.custom.InvalidCredentialsException;
import com.kotonekanno.movielog.exception.custom.NotFoundException;
import com.kotonekanno.movielog.repository.UserRepository;
import com.kotonekanno.movielog.security.JwtUtil;
import com.kotonekanno.movielog.service.maintenance.CacheCleanupService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

  private final JwtUtil jwtUtil;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final CacheCleanupService cacheCleanupService;

  public AuthService(
      JwtUtil jwtUtil,
      PasswordEncoder passwordEncoder,
      UserRepository userRepository,
      CacheCleanupService cacheCleanupService
  ) {
    this.jwtUtil = jwtUtil;
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
    this.cacheCleanupService = cacheCleanupService;
  }

  // Register
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

  // Log in
  public LoginResponse login(String email, String password) {

    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new NotFoundException("User not found"));

    if (!user.getIsActive()) {
      throw new NotFoundException("This account is not activated");
    }

    if (!passwordEncoder.matches(password, user.getPasswordHash())) {
      throw new InvalidCredentialsException("Invalid email or password");
    }

    if (Math.random() < 0.05) {
      cacheCleanupService.cleanupExpired();
    }

    String accessToken = jwtUtil.generateAccessToken(user.getId());
    String refreshToken = jwtUtil.generateRefreshToken(user.getId());

    return new LoginResponse(accessToken, refreshToken);
  }

  // Refresh token
  public String refresh(String refreshToken) {
    if (refreshToken == null || refreshToken.isBlank()) {
      throw new InvalidCredentialsException("Refresh token is missing");
    }

    try {
      Claims claims = jwtUtil.parseToken(refreshToken);

      if (!"refresh".equals(claims.get("type"))) {
        throw new InvalidCredentialsException("Invalid token type");
      }

      Integer userId = Integer.valueOf(claims.getSubject());

      User user = userRepository.findById(userId)
          .orElseThrow(() -> new NotFoundException("User not found"));

      if (!user.getIsActive()) {
        throw new NotFoundException("This account is not activated");
      }

      return jwtUtil.generateAccessToken(userId);

    } catch (ExpiredJwtException e) {
      throw new InvalidCredentialsException("Refresh token expired");
    } catch (JwtException e) {
      throw new InvalidCredentialsException("Invalid refresh token");
    }
  }
}
