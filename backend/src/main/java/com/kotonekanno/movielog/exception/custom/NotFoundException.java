package com.kotonekanno.movielog.exception.custom;

public class NotFoundException extends RuntimeException {
  public NotFoundException(String message) {
    super(message);
  }
}