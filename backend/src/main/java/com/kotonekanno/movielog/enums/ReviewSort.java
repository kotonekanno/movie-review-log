package com.kotonekanno.movielog.enums;

import lombok.Getter;

@Getter
public enum ReviewSort {
  createdAt("r.createdAt"),
  updatedAt("r.updatedAt"),
  score("r.score"),
  watchedAt("r.watchedAt"),
  jaTitle("m.jaTitle"),
  releaseYear("m.releaseYear");

  private final String jpaField;

  ReviewSort(String jpaField) {
    this.jpaField = jpaField;
  }

}