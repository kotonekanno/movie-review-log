package com.kotonekanno.movielog.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TmdbMovieDetailsDTO (
    String title,
    String original_title,
    String release_date,
    String poster_path
) {}
