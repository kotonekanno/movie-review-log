package com.kotonekanno.movie_review.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kotonekanno.movie_review.config.AppProperties;
import com.kotonekanno.movie_review.dto.TmdbMovieDetailsDTO;
import com.kotonekanno.movie_review.dto.TmdbSearchResponseDTO;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class TmdbApi {

  private final OkHttpClient client = new OkHttpClient();
  private final ObjectMapper mapper = new ObjectMapper();
  private final AppProperties appProperties;
  private final String apikey;

  public TmdbApi(AppProperties appProperties) {
    this.appProperties = appProperties;
    this.apikey = appProperties.getApiKey();
  }

  public TmdbSearchResponseDTO search(String query) throws IOException {
    Request request = new Request.Builder()
        .url("https://api.themoviedb.org/3/search/movie?query=" + query + "&include_adult=true&language=ja-JP&page=1")
        .get()
        .addHeader("accept", "application/json")
        .addHeader("Authorization", "Bearer " + apikey)
        .build();

    try (Response response = client.newCall(request).execute()) {
      if (!response.isSuccessful()) {
        throw new IOException("Unexpected code " + response);
      }
      String json = response.body().string();
      return mapper.readValue(json, TmdbSearchResponseDTO.class);
    }
  }

  public TmdbMovieDetailsDTO getDetails(Long id) throws IOException {
    Request request = new Request.Builder()
        .url("https://api.themoviedb.org/3/movie/" + id + "?language=ja-JP")
        .get()
        .addHeader("accept", "application/json")
        .addHeader("Authorization", "Bearer " + apikey)
        .build();

    try (Response response = client.newCall(request).execute()) {
      if (!response.isSuccessful()) {
        throw new IOException("Unexpected code " + response);
      }
      String json = response.body().string();
      return mapper.readValue(json, TmdbMovieDetailsDTO.class);
    }
  }
}
