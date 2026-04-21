package com.kotonekanno.movielog.dto.movie;

public record MovieDetails(
    Long tmdbId,
    String jaTitle,
    String originalTitle,
    String posterPath,
    String[] genres,
    String[] productionCountries,
    Integer releaseYear,
    Integer runtime
) {}
