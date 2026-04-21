package com.kotonekanno.movielog.controller;

import com.kotonekanno.movielog.dto.WatchlistDTO;
import com.kotonekanno.movielog.form.WatchlistForm;
import com.kotonekanno.movielog.service.WatchlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
      @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody WatchlistForm form
  ) {
    Integer watchlistId = watchlistService.create(userDetails, form);
    return ResponseEntity.status(201)
        .body(Map.of("watchlistId", watchlistId));
  }

  // Get a watchlist
  // return 200 OK
  @GetMapping
  public ResponseEntity<WatchlistDTO> getAll(
      @AuthenticationPrincipal UserDetails userDetails
  ) {
    return ResponseEntity.ok(watchlistService.getAll(userDetails));
  }

  // Update a watchlist item
  // returns 204 OK
  @PatchMapping("/{watchlist_id}")
  public ResponseEntity<Void> update(
      @AuthenticationPrincipal UserDetails userDetails,
      @PathVariable("watchlist_id") Integer watchlistId,
      @RequestBody WatchlistForm form
  ) {
    watchlistService.update(userDetails, watchlistId, form);
    return ResponseEntity.noContent().build();
  }

  // Update isWatched of a watchlist item
  // return 204 No Content
  @PatchMapping
  public ResponseEntity<Void> updateIsWatched(
      @AuthenticationPrincipal UserDetails userDetails,
      @RequestBody Map<String, Object> body
  ) {
    Integer watchlistId = (Integer) body.get("watchlistId");
    Boolean isWatched = (Boolean) body.get("isWatched");

    watchlistService.updateIsWatched(userDetails, watchlistId, isWatched);
    return ResponseEntity.noContent().build();
  }

  // Delete a watchlist item
  // returns 204 No Content
  @DeleteMapping("/{watchlist_id}")
  public ResponseEntity<Void> delete(
      @AuthenticationPrincipal UserDetails userDetails,
      @PathVariable("watchlist_id") Integer watchlistId
  ) {
    watchlistService.delete(userDetails, watchlistId);
    return ResponseEntity.noContent().build();
  }

  // Delete all watched watchlist items
  // returns 204 No Content
  @DeleteMapping("/bulk-delete")
  public ResponseEntity<Void> deleteIsWatched(@AuthenticationPrincipal UserDetails userDetails) {
    watchlistService.deleteIsWatched(userDetails);
    return ResponseEntity.noContent().build();
  }
}
