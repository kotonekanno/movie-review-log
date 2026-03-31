package com.kotonekanno.movie_review.dto;

public record TmdbSearchResultDTO (
    Long tmdbId,
    String title,
    String original_title,
    String poster_path
) {}
