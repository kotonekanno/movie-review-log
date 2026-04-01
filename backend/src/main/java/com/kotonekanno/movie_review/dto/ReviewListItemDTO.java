package com.kotonekanno.movie_review.dto;

public record ReviewListItemDTO(
    Long reviewId,
    String title,
    String posterPath,
    Double score
) {}
