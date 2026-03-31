package com.kotonekanno.movie_review.dto;

public record MovieDetailsDTO (
    String jaTitle,
    String originalTitle,
    Integer releaseYear,
    String posterPath
) {}
