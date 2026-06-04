package com.kotonekanno.movielog.dto.statistics;

public record StatisticsOverview(
  int totalReviews,
  int currentMonthReviews,
  CountByGenre[] reviewsPerGenre,
  double averageScore
) {}
