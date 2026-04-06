package com.kotonekanno.movielog.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<Map<String, String>> handleNotFoundException(NotFoundException e) {
    return ResponseEntity.status(404)  // Not found
        .body(Map.of("error", e.getMessage()));
  }

  @ExceptionHandler(AlreadyExistsException.class)
  public ResponseEntity<Map<String, String>> handleAlreadyExistsException(AlreadyExistsException e) {
    return ResponseEntity.status(409)  // Conflict
        .body(Map.of("error", e.getMessage()));
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<Map<String, String>> handleAccessDeniedException(AccessDeniedException e) {
    return ResponseEntity.status(403)  // Forbidden
        .body(Map.of("error", e.getMessage()));
  }

  @ExceptionHandler(ExternalApiException.class)
  public ResponseEntity<Map<String, String>> handleExternalApiException(ExternalApiException e) {
    return ResponseEntity.status(502)  // Bad gateway
        .body(Map.of("error", e.getMessage()));
  }
}
