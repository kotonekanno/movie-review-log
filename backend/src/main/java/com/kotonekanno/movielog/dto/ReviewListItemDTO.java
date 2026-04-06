package com.kotonekanno.movielog.dto;

public record ReviewListItemDTO(
    Long reviewId,
    String title,
    String posterPath,
    Double score
) {}
