package com.kotonekanno.movielog.controller;

import com.kotonekanno.movielog.dto.watchlist.WatchlistResponse;
import com.kotonekanno.movielog.dto.watchlist.WatchlistForm;
import com.kotonekanno.movielog.service.application.WatchlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
  public ResponseEntity<Map<String, Integer>> create(
      @AuthenticationPrincipal String userId,
      @RequestBody WatchlistForm form
  ) {
    Integer watchlistId = watchlistService.create(Integer.parseInt(userId), form);
    return ResponseEntity.status(201)
        .body(Map.of("watchlistId", watchlistId));
  }

  // Get a watchlist
  // return 200 OK
  @GetMapping
  public ResponseEntity<WatchlistResponse> getAll(
      @AuthenticationPrincipal String userId
  ) {
    return ResponseEntity.ok(watchlistService.getAll(Integer.parseInt(userId)));
  }

  // Update a watchlist item
  // returns 204 OK
  @PatchMapping("/{watchlist_id}")
  public ResponseEntity<Void> update(
      @AuthenticationPrincipal String userId,
      @PathVariable("watchlist_id") Integer watchlistId,
      @RequestBody WatchlistForm form
  ) {
    watchlistService.update(Integer.parseInt(userId), watchlistId, form);
    return ResponseEntity.noContent().build();
  }

  // Update isWatched of a watchlist item
  // return 204 No Content
  @PatchMapping
  public ResponseEntity<Void> updateIsWatched(
      @AuthenticationPrincipal String userId,
      @RequestBody Map<String, Object> body
  ) {
    Integer watchlistId = (Integer) body.get("watchlistId");
    Boolean isWatched = (Boolean) body.get("isWatched");

    watchlistService.updateIsWatched(Integer.parseInt(userId), watchlistId, isWatched);
    return ResponseEntity.noContent().build();
  }

  // Delete a watchlist item
  // returns 204 No Content
  @DeleteMapping("/{watchlist_id}")
  public ResponseEntity<Void> delete(
      @AuthenticationPrincipal String userId,
      @PathVariable("watchlist_id") Integer watchlistId
  ) {
    watchlistService.delete(Integer.parseInt(userId), watchlistId);
    return ResponseEntity.noContent().build();
  }

  // Delete all watched watchlist items
  // returns 204 No Content
  @DeleteMapping("/bulk-delete")
  public ResponseEntity<Void> deleteIsWatched(@AuthenticationPrincipal String userId) {
    watchlistService.deleteIsWatched(Integer.parseInt(userId));
    return ResponseEntity.noContent().build();
  }
}
