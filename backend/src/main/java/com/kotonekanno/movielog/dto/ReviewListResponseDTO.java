package com.kotonekanno.movielog.dto;

import java.util.List;

public record ReviewListResponseDTO (
    List<ReviewListItemDTO> reviews,
    int totalPages
) {}
