package com.kotonekanno.movielog.controller;

import com.kotonekanno.movielog.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.kotonekanno.movielog.service.UserService;

import java.util.Map;

@RestController
public class AuthController {

  private final UserService userService;

  public AuthController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<Map<String, Integer>> register(
      @RequestParam String email,
      @RequestParam String password
  ) {
    User user = userService.register(email, password);
    return ResponseEntity.status(201)  // Created
        .body(Map.of("userId", user.getId()));
  }

  @GetMapping("/me")
  public ResponseEntity<Void> getCurrentUser(
      @AuthenticationPrincipal UserDetails user
  ) {
    return ResponseEntity.ok().build();
  }
}