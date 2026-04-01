package com.kotonekanno.movie_review.controller;

import com.kotonekanno.movie_review.dto.WatchlistItemDTO;
import com.kotonekanno.movie_review.entity.User;
import com.kotonekanno.movie_review.form.WatchlistForm;
import com.kotonekanno.movie_review.service.WatchlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/watchlist")
public class WatchlistController {

  private final WatchlistService watchlistService;

  public WatchlistController(WatchlistService watchlistService) {
    this.watchlistService = watchlistService;
  }

  // Create a watchlist item
  // returns 201 Created
  @PostMapping
  public ResponseEntity<Map<String, Long>> create(
      @AuthenticationPrincipal User user,
      @RequestBody WatchlistForm form
  ) {
    Long watchlistId = watchlistService.create(user, form);
    return ResponseEntity.status(201)
        .body(Map.of("watchlistId", watchlistId));
  }

  // Get a watchlist
  // return 200 OK
  @GetMapping
  public ResponseEntity<Map<String, List<WatchlistItemDTO>>> getAll(
      @AuthenticationPrincipal User user,
      int page
  ) {
    List<WatchlistItemDTO> watchlist = watchlistService.getAll(user, page);

    return ResponseEntity.ok(Map.of("watchlist", watchlist));
  }

  // Update a watchlist item
  // returns 200 OK
  @PatchMapping("/{watchlist_id}")
  public ResponseEntity<WatchlistItemDTO> update(
      @AuthenticationPrincipal User user,
      @PathVariable("watchlist_id") Long watchlistId,
      @RequestBody WatchlistForm form
  ) {
    WatchlistItemDTO updatedWatchlistItem = watchlistService.update(user, watchlistId, form);
    return ResponseEntity.ok(updatedWatchlistItem);
  }

  // Update isWatched of a watchlist item
  // return 204 No Content
  @PatchMapping
  public ResponseEntity<Void> updateIsWatched(
      @AuthenticationPrincipal User user,
      @RequestBody Map<String, Object> body
  ) {
    Long watchlistId = ((Number) body.get("watchlistId")).longValue();
    Boolean isWatched = (Boolean) body.get("isWatched");

    watchlistService.updateIsWatched(user, watchlistId, isWatched);
    return ResponseEntity.noContent().build();
  }

  // Delete a watchlist item
  // returns 204 No Content
  @DeleteMapping("/{watchlist_id}")
  public ResponseEntity<Void> delete(
      @AuthenticationPrincipal User user,
      @PathVariable("watchlist_id") Long watchlistId
  ) {
    watchlistService.delete(user, watchlistId);
    return ResponseEntity.noContent().build();
  }

  // Delete all watched watchlist items
  // returns 204 No Content
  @DeleteMapping
  public ResponseEntity<Void> deleteIsWatched(
      @AuthenticationPrincipal User user,
      @RequestBody Map<String, List<Long>> body
  ) {
    List<Long> watchlistIds = body.get("watchlistIds");
    watchlistService.deleteIsWatched(user, watchlistIds);
    return ResponseEntity.noContent().build();
  }
}
