package com.kotonekanno.movielog.dto.watchlist;

import com.kotonekanno.movielog.dto.movie.MovieOverview;

public record WatchlistItem(
    Integer watchlistId,
    Boolean isWatched,
    Integer priority,
    String note,
    MovieOverview movie
) {}
