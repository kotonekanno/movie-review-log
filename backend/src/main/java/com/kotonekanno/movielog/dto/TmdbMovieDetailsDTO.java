package com.kotonekanno.movielog.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TmdbMovieDetailsDTO (
    String title,
    String original_title,
    String poster_path,
    TmdbGenresDTO[] genres,
    TmdbProductionCountriesDTO[] production_countries,
    String release_date,
    Integer runtime
) {}
