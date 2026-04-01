package com.kotonekanno.movie_review.dto;

public record WatchlistItemDTO (
    Long watchlistId,
    String jaTitle,
    String originalTitle,
    String posterPath,
    Integer priority,
    String note
) {}
