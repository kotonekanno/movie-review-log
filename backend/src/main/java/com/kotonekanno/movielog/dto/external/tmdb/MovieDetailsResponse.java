package com.kotonekanno.movielog.dto.external.tmdb;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record MovieDetailsResponse(
    String title,
    String original_title,
    String poster_path,
    Genre[] genres,
    ProductionCountry[] production_countries,
    String release_date,
    Integer runtime
) {}
