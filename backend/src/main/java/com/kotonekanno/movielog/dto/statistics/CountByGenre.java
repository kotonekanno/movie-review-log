package com.kotonekanno.movielog.dto.statistics;

public record CountByGenre(
   String genre,
   int count
) {}
