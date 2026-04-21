package com.kotonekanno.movielog.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;

@Entity
@Table(name = "movie_details")
@Getter
@Setter
public class MovieDetails {
  @Id
  @Column(name = "movie_id")
  private Integer movieId;

  @OneToOne
  @MapsId
  @JoinColumn(name = "movie_id")
  private Movie movie;

  @Column(name = "expires_at", nullable = false)
  private LocalDateTime expiresAt;

  @JdbcTypeCode(SqlTypes.ARRAY)
  @Column(name = "genres")
  private String[] genres;

  @JdbcTypeCode(SqlTypes.ARRAY)
  @Column(name = "production_countries")
  private String[] productionCountries;

  @Column(name = "release_year")
  private Integer releaseYear;

  private Integer runtime;
}
