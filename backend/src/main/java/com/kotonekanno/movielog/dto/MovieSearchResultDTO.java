package com.kotonekanno.movielog.dto;

public record MovieSearchResultDTO(
    Long tmdbId,
    String jaTitle,
    String originalTitle,
    String posterPath
) {}
