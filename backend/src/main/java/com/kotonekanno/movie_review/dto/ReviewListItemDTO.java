package com.kotonekanno.movie_review.dto;

public record ReviewListItemDTO(
  String title,
  String posterPath,
  Double score
) {}
