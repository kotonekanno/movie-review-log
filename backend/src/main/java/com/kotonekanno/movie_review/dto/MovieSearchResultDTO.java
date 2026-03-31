package com.kotonekanno.movie_review.dto;

public record MovieSearchResultDTO(
    Long tmdbId,
    String jaTitle,
    String originalTitle,
    String posterPath
) {}
