package com.kotonekanno.movielog.dto;

public record WatchlistItemDTO (
    Long watchlistId,
    Boolean isWatched,
    Integer priority,
    String note,
    MovieDetailsDTO movie
) {}
