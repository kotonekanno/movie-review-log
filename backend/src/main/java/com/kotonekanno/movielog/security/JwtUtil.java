package com.kotonekanno.movielog.security;

import org.springframework.stereotype.Component;

import java.util.Date;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import java.security.Key;

@Component
public class JwtUtil {

  @Value("${jwt.secret}")
  private String secret;

  @Value("${jwt.expiration}")
  private long expiration;

  private Key getKey() {
    return Keys.hmacShaKeyFor(secret.getBytes());
  }

  public String generateToken(Integer userId) {
    return Jwts.builder()
        .setSubject(String.valueOf(userId))
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(getKey())
        .compact();
  }

  public Integer extractUserId(String token) {
    return Integer.parseInt(Jwts.parserBuilder()
        .setSigningKey(getKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject());
  }

  public boolean validate(String token) {
    try {
      extractUserId(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }
}