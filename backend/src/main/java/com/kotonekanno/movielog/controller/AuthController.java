package com.kotonekanno.movielog.controller;

import com.kotonekanno.movielog.dto.auth.LoginRequest;
import com.kotonekanno.movielog.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.kotonekanno.movielog.service.application.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;

  public AuthController(
      AuthService authService
  ) {
    this.authService = authService;
  }

  // Register
  // returns 201 Created
  @PostMapping("/register")
  public ResponseEntity<Map<String, Integer>> register(
      @RequestParam String email,
      @RequestParam String password
  ) {
    User user = authService.register(email, password);
    return ResponseEntity.status(201)
        .body(Map.of("userId", user.getId()));
  }

  // Log In
  // returns 200 OK
  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
    return ResponseEntity.ok(Map.of("token", authService.login(request.email(), request.password())));
  }

  // Log out
  // returns 204 No Content
  @PostMapping("/logout")
  public ResponseEntity<Void> logout() {
    return ResponseEntity.noContent().build();
  }

  // returns 200 OK
  @GetMapping("/me")
  public ResponseEntity<Void> getCurrentUser(
      @AuthenticationPrincipal UserDetails user
  ) {
    return ResponseEntity.ok().build();
  }
}