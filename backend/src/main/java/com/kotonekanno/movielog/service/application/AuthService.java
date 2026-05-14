package com.kotonekanno.movielog.service.application;

import com.kotonekanno.movielog.dto.auth.LoginResponse;
import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.entity.VerificationToken;
import com.kotonekanno.movielog.exception.custom.AlreadyExistsException;
import com.kotonekanno.movielog.exception.custom.InvalidCredentialsException;
import com.kotonekanno.movielog.exception.custom.NotFoundException;
import com.kotonekanno.movielog.exception.custom.NotVerifiedException;
import com.kotonekanno.movielog.repository.UserRepository;
import com.kotonekanno.movielog.repository.VerificationTokenRepository;
import com.kotonekanno.movielog.security.JwtUtil;
import com.kotonekanno.movielog.service.external.MailService;
import com.kotonekanno.movielog.service.maintenance.CacheCleanupService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {

  private final JwtUtil jwtUtil;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final VerificationTokenRepository verificationTokenRepository;
  private final MailService mailService;
  private final CacheCleanupService cacheCleanupService;

  public AuthService(
      JwtUtil jwtUtil,
      PasswordEncoder passwordEncoder,
      UserRepository userRepository,
      VerificationTokenRepository verificationTokenRepository,
      MailService mailService,
      CacheCleanupService cacheCleanupService
  ) {
    this.jwtUtil = jwtUtil;
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
    this.verificationTokenRepository = verificationTokenRepository;
    this.mailService = mailService;
    this.cacheCleanupService = cacheCleanupService;
  }

  // Register
  @Transactional
  public User register(String email, String rawPassword) {
    if (userRepository.findByEmail(email).isPresent()) {
      throw new AlreadyExistsException("Email already exists: " + email);
    }

    String encoded = passwordEncoder.encode(rawPassword);

    User user = new User();
    user.setEmail(email);
    user.setPasswordHash(encoded);
    user.setCreatedAt(LocalDateTime.now());

    userRepository.save(user);

    sendVerificationMail(user);
    return user;
  }

  // Resend email verification
  public void resendVerification(String email) {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new NotFoundException("User not found"));

    if (user.getIsVerified()) {
      throw new AlreadyExistsException("Email already verified");
    }

    sendVerificationMail(user);
  }

  // Send email verification token
  private void sendVerificationMail(User user) {
    verificationTokenRepository.deleteByUser(user);

    VerificationToken vt = new VerificationToken();

    String token = UUID.randomUUID().toString();

    vt.setToken(token);
    vt.setUser(user);
    vt.setExpiresAt(LocalDateTime.now().plusMinutes(30));

    verificationTokenRepository.save(vt);

    mailService.sendVerificationMail(user.getEmail(), token);
  }

  // Verify email
  @Transactional
  public void verify(String token) {
    VerificationToken vt = verificationTokenRepository.findByToken(token)
        .orElseThrow(() -> new InvalidCredentialsException("Invalid token"));

    if (vt.getExpiresAt().isBefore(LocalDateTime.now())) {
      throw new InvalidCredentialsException("Token expired");
    }

    User user = vt.getUser();

    user.setIsVerified(true);
    userRepository.save(user);

    verificationTokenRepository.delete(vt);
  }

  // Log in
  public LoginResponse login(String email, String password) {

    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new NotFoundException("User not found"));

    if (!user.getIsVerified()) {
      throw new NotVerifiedException("This account is not verified");
    }

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

      if (!user.getIsVerified()) {
        throw new NotFoundException("This account is not verified");
      }

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
