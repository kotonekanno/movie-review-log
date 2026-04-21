package com.kotonekanno.movielog.dto.watchlist;

import java.util.List;

public record WatchlistResponse(
    List<WatchlistItem> watchlist,
    int watched
) {}
