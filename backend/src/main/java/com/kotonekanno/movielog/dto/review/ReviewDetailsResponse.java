package com.kotonekanno.movielog.dto.review;

import com.kotonekanno.movielog.dto.movie.MovieDetails;

import java.time.LocalDate;

public record ReviewDetailsResponse(
    Integer reviewId,
    Double score,
    String text,
    LocalDate watchedAt,
    MovieDetails movie
) {}