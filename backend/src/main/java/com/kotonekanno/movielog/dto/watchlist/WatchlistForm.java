package com.kotonekanno.movielog.dto.watchlist;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WatchlistForm {

  @NotNull
  private Long tmdbId;

  private String note;

  @Min(value = 0)
  @Max(value = 100)
  private Integer priority;
}
