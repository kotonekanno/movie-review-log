package com.kotonekanno.movielog.service.application;

import com.kotonekanno.movielog.dto.statistics.CountByGenre;
import com.kotonekanno.movielog.dto.statistics.StatisticsOverview;
import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.exception.custom.NotFoundException;
import com.kotonekanno.movielog.repository.ReviewRepository;
import com.kotonekanno.movielog.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class StatisticsService {

  private final UserRepository userRepository;
  private final ReviewRepository reviewRepository;

  public StatisticsService(
      UserRepository userRepository,
      ReviewRepository reviewRepository
  ) {
    this.userRepository = userRepository;
    this.reviewRepository = reviewRepository;
  }

  // Get statistics overview
  @Transactional(readOnly = true)
  public StatisticsOverview getOverview(int userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new NotFoundException("User not found"));

    int totalReviews = reviewRepository.countByUser(user);

    int month = LocalDate.now().getMonthValue();
    int currentMonthReviews = reviewRepository.countInCurrentMonth(user, month);

    CountByGenre[] reviewsPerGenre = new CountByGenre[0];

    Double averageScore = reviewRepository.getAverageScoreByUser(user)
          .orElse(0.0);

    return new StatisticsOverview(
        totalReviews,
        currentMonthReviews,
        reviewsPerGenre,
        averageScore
    );
  }

  // Get review count per month
  @Transactional(readOnly = true)
  public int[] getReviewsPerMonth(int userId, int year) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new NotFoundException("User not found"));

    int[] reviewsPerMonth = new int[12];

    List<Object[]> results = reviewRepository.countPerMonth(user, year);

    for (Object[] row : results) {
      int month = (Integer) row[0];
      int count = ((Long)  row[1]).intValue();

      reviewsPerMonth[month - 1] = count;
    }

    return reviewsPerMonth;
  }
}
