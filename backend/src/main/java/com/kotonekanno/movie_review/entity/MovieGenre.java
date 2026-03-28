package com.kotonekanno.movie_review.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "movie_genres")
@Getter
@Setter
public class MovieGenre {

  @EmbeddedId
  private MovieGenreId id;

  @ManyToOne
  @MapsId("movieId")
  @JoinColumn(name = "movie_id")
  private Movie movie;

  @ManyToOne
  @MapsId("genreId")
  @JoinColumn(name = "genre_id")
  private Genre genre;
}