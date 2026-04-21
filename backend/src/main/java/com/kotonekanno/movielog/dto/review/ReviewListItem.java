package com.kotonekanno.movielog.dto.review;

public record ReviewListItem(
    Integer reviewId,
    String title,
    String posterPath,
    Double score
) {}
