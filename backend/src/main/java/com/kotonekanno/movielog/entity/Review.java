package com.kotonekanno.movielog.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Getter
@Setter
public class Review {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "movie_id", nullable = false)
  private Movie movie;

  @Column(nullable = false)
  private Double score;

  private String text;

  @Column(name = "watched_at")
  private LocalDate watchedAt;

  @Column(name = "created_at", updatable = false, nullable = false)
  @CreationTimestamp
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  @UpdateTimestamp
  private LocalDateTime updatedAt;

  @Column(name = "deleted_at")
  private LocalDateTime deletedAt;
}
