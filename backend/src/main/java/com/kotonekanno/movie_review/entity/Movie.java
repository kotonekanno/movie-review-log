package com.kotonekanno.movie_review.entity;

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

  @Column(name = "external_id", nullable = false, unique = true)
  private Integer externalId;

  @Column(name = "ja_title")
  private String jaTitle;

  @Column(name = "en_title")
  private String enTitle;

  @Column(name = "original_title", nullable = false)
  private String originalTitle;

  @Column(name = "release_year")
  private Integer releaseYear;

  private String country;

  @Column(name = "poster_url")
  private String posterUrl;
}
