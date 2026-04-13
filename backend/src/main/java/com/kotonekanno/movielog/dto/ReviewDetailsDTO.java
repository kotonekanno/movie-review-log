package com.kotonekanno.movielog.dto;

import java.time.LocalDate;

public record ReviewDetailsDTO(
    Long reviewId,
    Double score,
    String text,
    LocalDate watchedAt,
    MovieDetailsDTO movie
) {}