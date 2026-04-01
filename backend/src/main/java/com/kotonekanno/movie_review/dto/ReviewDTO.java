package com.kotonekanno.movie_review.dto;

import java.time.LocalDate;

public record ReviewDTO (
    String jaTitle,
    String originalTitle,
    Integer releaseYear,
    String posterPath,
    Double score,
    String text,
    LocalDate watchedAt
) {}