package com.kotonekanno.movielog.dto;

public record WatchlistItemDTO (
    Long watchlistId,
    String jaTitle,
    String originalTitle,
    String posterPath,
    Boolean isWatched,
    Integer priority,
    String note
) {}
