package com.kotonekanno.movielog.dto.external.tmdb;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Genre(
    String name
) {}
