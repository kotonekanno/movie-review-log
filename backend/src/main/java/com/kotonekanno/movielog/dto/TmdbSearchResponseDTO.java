package com.kotonekanno.movielog.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TmdbSearchResponseDTO(
  List<TmdbSearchResultDTO> results
) {}
