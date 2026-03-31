package com.kotonekanno.movie_review.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "password_reset_tokens")
@Getter
@Setter
public class PasswordResetToken {

  @Id
  private String token;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  private LocalDateTime expiryDate;
}