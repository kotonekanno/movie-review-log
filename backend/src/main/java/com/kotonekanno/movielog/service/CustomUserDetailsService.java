package com.kotonekanno.movielog.service;

import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    return org.springframework.security.core.userdetails.User
        .withUsername(user.getEmail())
        .password(user.getPasswordHash())
        .roles("USER")
        .disabled(user.getDeletedAt() != null)
        .build();
  }
/*
    return userRepository.findByEmail(email)
        .map(
            user -> new
        )
}
*//*

import com.kotonekanno.movielog.config.CustomUserDetails;
import com.kotonekanno.movielog.exception.NotFoundException;
import com.kotonekanno.movielog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return userRepository.findByEmail(email)
        .map(
            user -> new CustomUserDetails(
                user.getEmail(),
                user.getPasswordHash(),
                Collections.emptyList()
            )
        )
        .orElseThrow(() -> new UsernameNotFoundException("ユーザー情報の取得に失敗しました。（email = " + email + "）"));
  }*/
}