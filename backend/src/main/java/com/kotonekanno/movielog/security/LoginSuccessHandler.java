package com.kotonekanno.movielog.security;

import com.kotonekanno.movielog.service.maintenance.CacheCleanupService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {
  private final CacheCleanupService cacheCleanupService;

  public LoginSuccessHandler(CacheCleanupService cacheCleanupService) {
    this.cacheCleanupService = cacheCleanupService;
  }

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest request,
      HttpServletResponse response,
      Authentication authentication
  ) throws IOException, ServletException {
    if (Math.random() < 0.3) {
      cacheCleanupService.cleanupExpired();
    }

    response.setStatus(HttpServletResponse.SC_NO_CONTENT);
  }
}
