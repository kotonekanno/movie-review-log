package com.kotonekanno.movie_review.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "watchlist_items", uniqueConstraints = { @UniqueConstraint(columnNames = {"user_id", "movie_id"})})
@Getter
@Setter
public class WatchlistItem {
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
  private Integer priority;

  private String note;

  @Column(nullable = false)
  private Boolean isWatched;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @PrePersist
  public void prePersist() {
    if (this.createdAt == null) {
      this.createdAt = LocalDateTime.now();
    }
    if (this.isWatched == null) {
      this.isWatched = false;
    }
  }
}
