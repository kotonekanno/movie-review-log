package com.kotonekanno.movielog.controller;

import com.kotonekanno.movielog.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.kotonekanno.movielog.service.UserService;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

  private final UserService userService;

  public AuthController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<Map<String, Long>> register(
      @RequestParam String email,
      @RequestParam String password
  ) {
    User user = userService.register(email, password);
    return ResponseEntity.status(201)  // Created
        .body(Map.of("userId", user.getId()));
  }
}