package com.kotonekanno.movie_review.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.kotonekanno.movie_review.service.UserService;

@Controller
public class AuthController {

  private final UserService userService;

  public AuthController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(
      @RequestParam String email,
      @RequestParam String password
  ) {
    userService.register(email, password);
    return ResponseEntity.ok().build();
  }
}