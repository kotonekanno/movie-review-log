package com.kotonekanno.movielog.dto.review;

import java.util.List;

public record ReviewListResponse(
    List<ReviewListItem> reviews,
    int totalPages
) {}
