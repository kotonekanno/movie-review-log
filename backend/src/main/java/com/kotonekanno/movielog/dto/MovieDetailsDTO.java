package com.kotonekanno.movielog.dto;

public record MovieDetailsDTO (
    Long movieId,
    String jaTitle,
    String originalTitle,
    Integer releaseYear,
    String posterPath
) {}
