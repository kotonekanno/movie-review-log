package com.kotonekanno.movielog.config;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class CustomUserDetails extends User {
  public CustomUserDetails(String email, String passwordHash, Collection<? extends GrantedAuthority> authorities) {
    super(email, passwordHash, authorities);
  }
}
