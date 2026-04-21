package com.kotonekanno.movielog.exception.custom;

public class ExternalApiException extends RuntimeException {
  public ExternalApiException(String message, Throwable cause) {
    super(message, cause);
  }
}