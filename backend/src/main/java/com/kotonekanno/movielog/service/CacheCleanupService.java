package com.kotonekanno.movielog.service;

import com.kotonekanno.movielog.repository.MovieDetailsRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class CacheCleanupService {
  private final MovieDetailsRepository movieDetailsRepository;

  public CacheCleanupService(MovieDetailsRepository movieDetailsRepository) {
    this.movieDetailsRepository = movieDetailsRepository;
  }

  @Async
  @Transactional
  public void cleanupExpired() {
    System.out.println("クリーンアップ処理が実行されました");
    movieDetailsRepository.deleteExpired(LocalDateTime.now(), 50);
  }
}
