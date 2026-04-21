package com.kotonekanno.movielog.form;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReviewForm {

  @NotNull
  private Long tmdbId;

  private String text;

  @DecimalMin(value = "0.0", inclusive = true)
  @DecimalMax(value = "5.0", inclusive = true)
  private Double score;

  @NotNull
  private LocalDate watchedAt;
}
