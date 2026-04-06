package com.kotonekanno.movielog.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class MovieGenreId implements Serializable {

  @Column(name = "movie_id")
  private Long movieId;

  @Column(name = "genre_id")
  private Long genreId;
}