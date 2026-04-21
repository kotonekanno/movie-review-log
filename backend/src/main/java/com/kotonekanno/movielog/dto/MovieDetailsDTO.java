package com.kotonekanno.movielog.dto;

public record MovieDetailsDTO (
    Long tmdbId,
    String jaTitle,
    String originalTitle,
    String posterPath,
    String[] genres,
    String[] productionCountries,
    Integer releaseYear,
    Integer runtime
) {}
