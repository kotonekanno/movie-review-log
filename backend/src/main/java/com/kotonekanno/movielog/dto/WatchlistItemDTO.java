package com.kotonekanno.movielog.dto;

public record WatchlistItemDTO (
    Long watchlistId,
    Long movieId,
    String jaTitle,
    String originalTitle,
    String posterPath,
    Boolean isWatched,
    Integer priority,
    String note
) {}
