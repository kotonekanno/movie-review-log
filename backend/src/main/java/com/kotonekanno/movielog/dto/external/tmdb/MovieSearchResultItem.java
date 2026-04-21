package com.kotonekanno.movielog.dto.external.tmdb;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record MovieSearchResultItem(
    Long id,
    String title,
    String original_title,
    String poster_path
) {}
