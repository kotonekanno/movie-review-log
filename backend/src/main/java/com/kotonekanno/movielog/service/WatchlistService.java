package com.kotonekanno.movielog.service;

import com.kotonekanno.movielog.dto.WatchlistItemDTO;
import com.kotonekanno.movielog.entity.Movie;
import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.entity.WatchlistItem;
import com.kotonekanno.movielog.exception.AccessDeniedException;
import com.kotonekanno.movielog.exception.NotFoundException;
import com.kotonekanno.movielog.form.WatchlistForm;
import com.kotonekanno.movielog.repository.MovieRepository;
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
  private final MovieRepository movieRepository;

  public WatchlistService(WatchlistItemRepository watchlistItemRepository, UserRepository userRepository, MovieRepository movieRepository) {
    this.watchlistItemRepository = watchlistItemRepository;
    this.userRepository = userRepository;
    this.movieRepository = movieRepository;
  }

  // Create a watchlist item
  @Transactional
  public Long create(UserDetails userDetails, WatchlistForm form) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    WatchlistItem watchlistItem = new WatchlistItem();
    Movie movie = movieRepository.findById(form.getMovieId())
        .orElseThrow(() -> new NotFoundException("Movie not found"));

    watchlistItem.setUser(user);
    watchlistItem.setMovie(movie);
    watchlistItem.setPriority(form.getPriority());
    watchlistItem.setNote(form.getNote());

    return watchlistItemRepository.save(watchlistItem).getId();
  }

  // Get a watchlist
  @Transactional(readOnly = true)
  public List<WatchlistItemDTO> getAll(UserDetails userDetails) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));

    return watchlistItemRepository.findWatchlistItemDTOs(user.getId());
  }

  // Update a watchlist item
  // needs verification
  @Transactional
  public WatchlistItemDTO update(UserDetails userDetails, Long watchlistId, WatchlistForm form) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    WatchlistItem watchlistItem = watchlistItemRepository.findById(watchlistId)
        .orElseThrow(() -> new NotFoundException("Watchlist item not found"));

    if (!watchlistItem.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to update this watchlist item");
    }

    if (form.getNote() != null) {
      watchlistItem.setNote(form.getNote());
    }
    if (form.getPriority() != null) {
      watchlistItem.setPriority(form.getPriority());
    }

    WatchlistItem updated = watchlistItemRepository.save(watchlistItem);

    return new WatchlistItemDTO(
        updated.getId(),
        updated.getMovie().getJaTitle(),
        updated.getMovie().getOriginalTitle(),
        updated.getMovie().getPosterPath(),
        updated.getIsWatched(),
        updated.getPriority(),
        updated.getNote()
    );
  }

  // Update isWatched of a watchlist item
  // needs verification
  @Transactional
  public void updateIsWatched(UserDetails userDetails, Long watchlistId, boolean isWatched) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    WatchlistItem watchlistItem = watchlistItemRepository.findById(watchlistId)
        .orElseThrow(() -> new NotFoundException("Watchlist item not found"));

    if (!watchlistItem.getUser().equals(user)) {
      throw new AccessDeniedException("You do not have permission to update this watchlist item");
    }

    watchlistItem.setIsWatched(isWatched);

    if (isWatched) {
      watchlistItem.setPriority(0);
    }
  }

  // Delete a watchlist item
  // needs verification
  @Transactional
  public void delete(UserDetails userDetails, Long watchlistId) {
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
  // needs verification
  @Transactional
  public void deleteIsWatched(UserDetails userDetails, List<Long> watchlistIds) {
    User user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new NotFoundException("User not found"));
    List<WatchlistItem> items = watchlistItemRepository.findAllById(watchlistIds);

    for (WatchlistItem item : items) {
      if (!item.getUser().equals(user)) {
        throw new AccessDeniedException("You do not have permission to delete this watchlist item");
      }

      if (Boolean.TRUE.equals(item.getIsWatched())) {
        continue;
      }

      watchlistItemRepository.delete(item);
    }
  }
}
