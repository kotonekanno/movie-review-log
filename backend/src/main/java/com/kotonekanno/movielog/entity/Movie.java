package com.kotonekanno.movielog.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "movies")
@Getter
@Setter
public class Movie {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "tmdb_id", nullable = false, unique = true)
  private Long tmdbId;

  @Column(name = "ja_title")
  private String jaTitle;

  @Column(name = "original_title", nullable = false)
  private String originalTitle;

  @Column(name = "release_year")
  private Integer releaseYear;

  @Column(name = "poster_path")
  private String posterPath;
}
