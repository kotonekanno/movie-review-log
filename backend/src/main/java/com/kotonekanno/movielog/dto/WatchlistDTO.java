package com.kotonekanno.movielog.dto;

import java.util.List;

public record WatchlistDTO(
    List<WatchlistItemDTO> watchlist,
    int watched
) {}
