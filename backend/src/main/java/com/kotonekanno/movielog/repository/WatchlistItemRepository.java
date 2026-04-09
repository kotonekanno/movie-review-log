package com.kotonekanno.movielog.repository;

import com.kotonekanno.movielog.dto.WatchlistItemDTO;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import com.kotonekanno.movielog.entity.WatchlistItem;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistItemRepository extends JpaRepository<WatchlistItem, Long> {

  @Query("""
      SELECT new com.kotonekanno.movielog.dto.WatchlistItemDTO(
        w.id,
        m.id,
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
      ORDER BY w.priority DESC
  """)
  List<WatchlistItemDTO> findWatchlistItemDTOs(@Param("userId") Long userId);

  @Modifying
  @Query("DELETE FROM WatchlistItem w WHERE w.user.id = :userId AND w.isWatched = true")
  void deleteAllWatchedByUserId(@Param("userId") Long userId);

  boolean existsByUserIdAndMovieId(Long id, Long id1);

  boolean existsByUserIdAndMovieIdAndIdNot(Long id, @NotNull Long movieId, Long id1);
}
