package com.kotonekanno.movielog.dto;

public record WatchlistItemDTO (
    Integer watchlistId,
    Boolean isWatched,
    Integer priority,
    String note,
    MovieOverviewDTO movie
) {}
