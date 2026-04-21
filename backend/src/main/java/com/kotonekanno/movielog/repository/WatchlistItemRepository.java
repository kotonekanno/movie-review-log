package com.kotonekanno.movielog.repository;

import com.kotonekanno.movielog.dto.watchlist.WatchlistItem;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistItemRepository extends JpaRepository<com.kotonekanno.movielog.entity.WatchlistItem, Integer> {

  @Query("""
      SELECT new com.kotonekanno.movielog.dto.watchlist.WatchlistItem(
        w.id,
        w.isWatched,
        w.priority,
        w.note,
        new com.kotonekanno.movielog.dto.movie.MovieOverview(
          m.tmdbId,
          m.jaTitle,
          m.originalTitle,
          m.posterPath
        )
      )
      FROM WatchlistItem w
      JOIN Movie m ON w.tmdbId = m.tmdbId
      WHERE w.user.id = :userId
      ORDER BY w.priority DESC
  """)
  List<WatchlistItem> findWatchlistItemDTOs(@Param("userId") Integer userId);

  @Modifying
  @Query("DELETE FROM WatchlistItem w WHERE w.user.id = :userId AND w.isWatched = true")
  void deleteAllWatchedByUserId(@Param("userId") Integer userId);

  boolean existsByUserIdAndTmdbId(Integer userId, Long tmdbId);

  boolean existsByUserIdAndTmdbIdAndIdNot(Integer id, @NotNull Long tmdbId, Integer id1);
}
