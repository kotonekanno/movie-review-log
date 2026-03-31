package com.kotonekanno.movie_review.dto;

import java.time.LocalDate;

public record ReviewDTO (
  String jaTitle,
  String OriginalTitle,
  Integer releaseYear,
  String posterPath,
  Double score,
  String text,
  LocalDate watchedAt
) {}