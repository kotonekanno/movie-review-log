package com.kotonekanno.movielog.service.external;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kotonekanno.movielog.config.properties.TmdbProperties;
import com.kotonekanno.movielog.dto.external.tmdb.MovieDetailsResponse;
import com.kotonekanno.movielog.dto.external.tmdb.MovieSearchResponse;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class TmdbClient {

  private final OkHttpClient client = new OkHttpClient();
  private final ObjectMapper mapper = new ObjectMapper();
  private final String apikey;

  public TmdbClient(TmdbProperties tmdbProperties) {
    this.apikey = tmdbProperties.getApiKey();
  }

  public MovieSearchResponse search(String query) throws IOException {
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
      return mapper.readValue(json, MovieSearchResponse.class);
    }
  }

  public MovieDetailsResponse getDetails(Long id) throws IOException {
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
      return mapper.readValue(json, MovieDetailsResponse.class);
    }
  }
}
