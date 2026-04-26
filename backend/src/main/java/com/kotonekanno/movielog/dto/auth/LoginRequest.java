package com.kotonekanno.movielog.dto.auth;

public record LoginRequest(
    String email,
    String password
) {}