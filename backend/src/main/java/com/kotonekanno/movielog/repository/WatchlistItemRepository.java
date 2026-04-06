package com.kotonekanno.movielog.repository;

import com.kotonekanno.movielog.dto.WatchlistItemDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movielog.entity.WatchlistItem;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistItemRepository extends JpaRepository<WatchlistItem, Long> {

  @Query("""
      SELECT new com.kotonekanno.movielog.dto.WatchlistItemDTO(
        w.id,
        m.jaTitle,
        m.originalTitle,
        m.posterPath,
        w.isWatched,
        w.priority,
        w.note
      )
      FROM WatchlistItem w
      JOIN w.movie m
      WHERE w.user.id = :userId
  """)
  List<WatchlistItemDTO> findWatchlistItemDTOs(@Param("userId") Long userId);
}
