package com.kotonekanno.movielog.service;

import com.kotonekanno.movielog.dto.WatchlistItemDTO;
import com.kotonekanno.movielog.dto.WatchlistDTO;
import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.entity.WatchlistItem;
import com.kotonekanno.movielog.exception.AccessDeniedException;
import com.kotonekanno.movielog.exception.AlreadyExistsException;
import com.kotonekanno.movielog.exception.NotFoundException;
import com.kotonekanno.movielog.form.WatchlistForm;
import com.kotonekanno.movielog.repository.UserRepository;
import com.kotonekanno.movielog.repository.WatchlistItemRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WatchlistService {

  private final WatchlistItemRepository watchlistItemRepository;
  private final UserRepository userRepository;

  public WatchlistService(
      WatchlistItemRepository watchlistItemRepository,
      UserRepository userRepository) {
    this.watchlistItemRepository = watchlistItemRepository;
    this.userRepository = userRepository;
  }

  // Create a watchlist item
  @Transactional
  public Integer create(UserDetails userDetails, WatchlistForm form) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    WatchlistItem watchlistItem = new WatchlistItem();
    Long tmdbId = form.getTmdbId();

    if (watchlistItemRepository.existsByUserIdAndTmdbId(user.getId(), tmdbId)) {
      throw new AlreadyExistsException("Watchlist item already exists");
    }

    watchlistItem.setUser(user);
    watchlistItem.setTmdbId(tmdbId);
    watchlistItem.setPriority(form.getPriority());
    watchlistItem.setNote(form.getNote());

    return watchlistItemRepository.save(watchlistItem).getId();
  }

  // Get a watchlist
  @Transactional(readOnly = true)
  public WatchlistDTO getAll(UserDetails userDetails) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));

    List<WatchlistItemDTO> items = watchlistItemRepository.findWatchlistItemDTOs(user.getId());

    int watched = (int) items.stream()
        .filter(WatchlistItemDTO::isWatched)
        .count();

    return new WatchlistDTO(items, watched);
  }

  // Update a watchlist item
  // needs verification
  @Transactional
  public void update(UserDetails userDetails, Integer watchlistId, WatchlistForm form) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    WatchlistItem watchlistItem = watchlistItemRepository.findById(watchlistId)
        .orElseThrow(() -> new NotFoundException("Watchlist item not found"));

    if (!watchlistItem.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to update this watchlist item");
    }

    Long tmdbId = form.getTmdbId();

    if (tmdbId != null &&
        tmdbId.equals(watchlistItem.getTmdbId())) {

      if (watchlistItemRepository.existsByUserIdAndTmdbIdAndIdNot(
          user.getId(),
          tmdbId,
          watchlistItem.getId()
      )) {
        throw new AlreadyExistsException("Watchlist item already exists");
      }

      watchlistItem.setTmdbId(tmdbId);
    }

    if (form.getNote() != null) {
      watchlistItem.setNote(form.getNote());
    }
    if (form.getPriority() != null) {
      watchlistItem.setPriority(form.getPriority());
    }

    watchlistItemRepository.save(watchlistItem);
  }

  // Update isWatched of a watchlist item
  // needs verification
  @Transactional
  public void updateIsWatched(UserDetails userDetails, Integer watchlistId, boolean isWatched) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    WatchlistItem watchlistItem = watchlistItemRepository.findById(watchlistId)
        .orElseThrow(() -> new NotFoundException("Watchlist item not found"));

    if (!watchlistItem.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to update this watchlist item");
    }

    watchlistItem.setIsWatched(isWatched);
  }

  // Delete a watchlist item
  // needs verification
  @Transactional
  public void delete(UserDetails userDetails, Integer watchlistId) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    WatchlistItem watchlistItem = watchlistItemRepository
        .findById(watchlistId)
        .orElseThrow(() -> new NotFoundException("WatchlistItem not found"));

    if (!watchlistItem.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to delete this watchlist item");
    }

    watchlistItemRepository.delete(watchlistItem);
  }

  // Delete all watched watchlist items
  @Transactional
  public void deleteIsWatched(UserDetails userDetails) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));

    watchlistItemRepository.deleteAllWatchedByUserId(user.getId());
  }
}
