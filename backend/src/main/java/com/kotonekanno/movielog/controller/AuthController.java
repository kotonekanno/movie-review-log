package com.kotonekanno.movielog.controller;

import com.kotonekanno.movielog.config.properties.CookieProperties;
import com.kotonekanno.movielog.config.properties.JwtProperties;
import com.kotonekanno.movielog.dto.auth.LoginRequest;
import com.kotonekanno.movielog.dto.auth.LoginResponse;
import com.kotonekanno.movielog.entity.User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.kotonekanno.movielog.service.application.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;
  private final boolean secure;
  private final String sameSite;
  private final long refreshTokenExpiration;

  public AuthController(
      AuthService authService,
      CookieProperties cookieProperties,
      JwtProperties jwtProperties
  ) {
    this.authService = authService;
    this.secure = cookieProperties.getSecure();
    this.sameSite = cookieProperties.getSameSite();
    this.refreshTokenExpiration = jwtProperties.getRefreshTokenExpiration();
  }

  // Register
  // returns 201 Created
  @PostMapping("/register")
  public ResponseEntity<Map<String, Integer>> register(@RequestBody LoginRequest request) {
    User user = authService.register(request.email(), request.password());
    return ResponseEntity.status(201)
        .body(Map.of("userId", user.getId()));
  }

  // Log In
  // returns 200 OK
  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> login(
      @RequestBody LoginRequest request,
      HttpServletResponse response
  ) {
    LoginResponse tokens = authService.login(request.email(), request.password());

    ResponseCookie cookie = ResponseCookie.from("refreshToken", tokens.refreshToken())
        .httpOnly(true)
        .secure(secure)
        .path("/auth/refresh")
        .maxAge(refreshTokenExpiration)
        .sameSite(sameSite)
        .build();

    response.addHeader("Set-Cookie", cookie.toString());

    return ResponseEntity.ok(Map.of("accessToken", tokens.accessToken()));
  }

  // Log out
  // returns 204 No Content
  @PostMapping("/logout")
  public ResponseEntity<Void> logout(HttpServletResponse response) {

    ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
        .httpOnly(true)
        .secure(secure)
        .path("/auth/refresh")
        .maxAge(0)
        .sameSite(sameSite)
        .build();

    response.addHeader("Set-Cookie", cookie.toString());

    return ResponseEntity.noContent().build();
  }

  // me
  // returns 200 OK
  @GetMapping("/me")
  public ResponseEntity<Void> getCurrentUser(
      @AuthenticationPrincipal Integer userId
  ) {
    if (userId == null) {
      return ResponseEntity.status(401).build();
    }
    return ResponseEntity.ok().build();
  }

  // Refresh token
  // returns 200 OK
  @PostMapping("/refresh")
  public ResponseEntity<Map<String, String>> refresh(
      @CookieValue(value = "refreshToken", required = false) String refreshToken
  ) {
    String newAccessToken = authService.refresh(refreshToken);
    return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
  }
}