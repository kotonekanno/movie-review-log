package com.kotonekanno.movie_review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movie_review.entity.WatchlistItem;

public interface WatchlistItemRepository extends JpaRepository<WatchlistItem, Long> {
}
