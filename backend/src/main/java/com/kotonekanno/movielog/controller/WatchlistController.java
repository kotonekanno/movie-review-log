package com.kotonekanno.movielog.controller;

import com.kotonekanno.movielog.dto.WatchlistItemDTO;
import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.form.WatchlistForm;
import com.kotonekanno.movielog.service.WatchlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
      @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody WatchlistForm form
  ) {
    Long watchlistId = watchlistService.create(userDetails, form);
    return ResponseEntity.status(201)
        .body(Map.of("watchlistId", watchlistId));
  }

  // Get a watchlist
  // return 200 OK
  @GetMapping
  public ResponseEntity<Map<String, List<WatchlistItemDTO>>> getAll(
      @AuthenticationPrincipal UserDetails userDetails
  ) {
    List<WatchlistItemDTO> watchlist = watchlistService.getAll(userDetails);

    return ResponseEntity.ok(Map.of("watchlist", watchlist));
  }

  // Update a watchlist item
  // returns 200 OK
  @PatchMapping("/{watchlist_id}")
  public ResponseEntity<WatchlistItemDTO> update(
      @AuthenticationPrincipal UserDetails userDetails,
      @PathVariable("watchlist_id") Long watchlistId,
      @RequestBody WatchlistForm form
  ) {
    WatchlistItemDTO updatedWatchlistItem = watchlistService.update(userDetails, watchlistId, form);
    return ResponseEntity.ok(updatedWatchlistItem);
  }

  // Update isWatched of a watchlist item
  // return 204 No Content
  @PatchMapping
  public ResponseEntity<Void> updateIsWatched(
      @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody Map<String, Object> body
  ) {
    Long watchlistId = ((Number) body.get("watchlistId")).longValue();
    Boolean isWatched = (Boolean) body.get("isWatched");

    watchlistService.updateIsWatched(userDetails, watchlistId, isWatched);
    return ResponseEntity.noContent().build();
  }

  // Delete a watchlist item
  // returns 204 No Content
  @DeleteMapping("/{watchlist_id}")
  public ResponseEntity<Void> delete(
      @AuthenticationPrincipal UserDetails userDetails,
      @PathVariable("watchlist_id") Long watchlistId
  ) {
    watchlistService.delete(userDetails, watchlistId);
    return ResponseEntity.noContent().build();
  }

  // Delete all watched watchlist items
  // returns 204 No Content
  @DeleteMapping
  public ResponseEntity<Void> deleteIsWatched(
      @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody Map<String, List<Long>> body
  ) {
    List<Long> watchlistIds = body.get("watchlistIds");
    watchlistService.deleteIsWatched(userDetails, watchlistIds);
    return ResponseEntity.noContent().build();
  }
}
