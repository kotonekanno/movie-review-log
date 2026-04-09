package com.kotonekanno.movielog.dto;

import java.util.List;

public record WatchlistResponseDTO (
    List<WatchlistItemDTO> watchlist,
    int watched
) {}
