package com.kotonekanno.movie_review.repository;

import com.kotonekanno.movie_review.dto.WatchlistItemDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movie_review.entity.WatchlistItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistItemRepository extends JpaRepository<WatchlistItem, Long> {

  @Query("""
      SELECT new com.kotonekanno.movie_review.dto.WatchlistItemDTO(
        w.id,
        m.jaTitle,
        m.originalTitle,
        m.posterPath,
        w.priority,
        w.note
      )
      FROM WatchlistItem w
      JOIN w.movie m
      WHERE w.user.id = :userId
  """)
  List<WatchlistItemDTO> findWatchlistItemDTOs(@Param("userId") Long userId, Pageable pageable);
}
