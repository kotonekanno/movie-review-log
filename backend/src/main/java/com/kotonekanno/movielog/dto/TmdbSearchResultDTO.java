package com.kotonekanno.movielog.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TmdbSearchResultDTO (
    Long id,
    String title,
    String original_title,
    String poster_path
) {}
