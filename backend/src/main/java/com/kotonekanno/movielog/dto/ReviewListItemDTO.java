package com.kotonekanno.movielog.dto;

public record ReviewListItemDTO(
    Integer reviewId,
    String title,
    String posterPath,
    Double score
) {}
