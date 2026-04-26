package com.kotonekanno.movielog.dto.auth;

public record LoginResponse(
    String accessToken,
    String refreshToken
) {}
