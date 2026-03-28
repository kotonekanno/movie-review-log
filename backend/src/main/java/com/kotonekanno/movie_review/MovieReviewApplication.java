package com.kotonekanno.movie_review;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MovieReviewApplication {

  public static void main(String[] args) {
    // .envを読み込む
    Dotenv dotenv = Dotenv.load();

    // DotenvEntryをループして環境変数としてセット
    for (DotenvEntry entry : dotenv.entries()) {
      System.setProperty(entry.getKey(), entry.getValue());
    }

    // Spring Bootアプリ起動
    SpringApplication.run(MovieReviewApplication.class, args);
  }
}