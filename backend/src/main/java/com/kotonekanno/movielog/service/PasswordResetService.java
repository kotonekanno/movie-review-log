package com.kotonekanno.movielog.service;

import com.kotonekanno.movielog.entity.PasswordResetToken;
import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.exception.NotFoundException;
import com.kotonekanno.movielog.repository.PasswordResetTokenRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

  private final PasswordResetTokenRepository passwordResetTokenRepository;

  public PasswordResetService(PasswordResetTokenRepository passwordResetTokenRepository) {
    this.passwordResetTokenRepository = passwordResetTokenRepository;
  }

  public String generate(User user) {
    String token = UUID.randomUUID().toString();

    PasswordResetToken entity = new PasswordResetToken();
    entity.setToken(token);
    entity.setUser(user);
    entity.setExpiryDate(LocalDateTime.now().plusHours(1));

    passwordResetTokenRepository.save(entity);

    return token;
  }

  public User verify(String tokenStr) {
    PasswordResetToken token = passwordResetTokenRepository.findById(tokenStr)
        .orElseThrow(() -> new NotFoundException("Token not found"));

    if (token.getExpiryDate().isBefore(LocalDateTime.now())) {
      throw new RuntimeException("Expired token");
    }

    passwordResetTokenRepository.delete(token);

    return token.getUser();
  }
}
