package com.kotonekanno.movielog.controller;


import com.kotonekanno.movielog.dto.statistics.StatisticsOverview;
import com.kotonekanno.movielog.service.application.StatisticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Year;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {
  private final StatisticsService statisticsService;

  public StatisticsController(StatisticsService statisticsService) {
    this.statisticsService = statisticsService;
  }

  // Get statistics overview
  // returns 200 OK
  @GetMapping("/overview")
  public ResponseEntity<StatisticsOverview> getOverview(
      @AuthenticationPrincipal Integer userId
  ) {
    return ResponseEntity.ok(statisticsService.getOverview(userId));
  }

  // Get review's count per month
  // returns 200 OK
  @GetMapping("/monthly")
  public ResponseEntity<?> get(
      @AuthenticationPrincipal Integer userId,
      @RequestParam(required = false) Integer year
  ) {
    int targetYear = year != null
        ? year
        : Year.now().getValue();

    return ResponseEntity.ok(statisticsService.getReviewsPerMonth(userId, targetYear));
  }
}
