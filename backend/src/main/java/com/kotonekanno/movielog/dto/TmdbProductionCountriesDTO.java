package com.kotonekanno.movielog.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TmdbProductionCountriesDTO(
    String name
) {}
