package com.kotonekanno.movielog.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "watchlist_items", uniqueConstraints = { @UniqueConstraint(columnNames = {"user_id", "tmdb_id"})})
@Getter
@Setter
public class WatchlistItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "tmdb_id", nullable = false)
  private Long tmdbId;

  @Column(nullable = false)
  private Integer priority;

  private String note;

  @Column(nullable = false)
  private Boolean isWatched = false;

  @Column(name = "created_at", nullable = false, updatable = false)
  @CreationTimestamp
  private LocalDateTime createdAt;
}
