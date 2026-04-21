package com.kotonekanno.movielog.dto.movie;

public record MovieOverview(
    Long tmdbId,
    String jaTitle,
    String originalTitle,
    String posterPath
) {}
