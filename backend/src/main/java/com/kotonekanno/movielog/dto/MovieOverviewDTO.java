package com.kotonekanno.movielog.dto;

public record MovieOverviewDTO(
    Long tmdbId,
    String jaTitle,
    String originalTitle,
    String posterPath
) {}
