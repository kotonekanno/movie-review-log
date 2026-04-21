package com.kotonekanno.movielog.security;

import com.kotonekanno.movielog.entity.User;
import com.kotonekanno.movielog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Service;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final LoginSuccessHandler loginSuccessHandler;

  public SecurityConfig(LoginSuccessHandler loginSuccessHandler) {
    this.loginSuccessHandler = loginSuccessHandler;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(Customizer.withDefaults())
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            .requestMatchers("/login", "/register", "/error").permitAll()
            .anyRequest().authenticated()
        )
        .exceptionHandling(ex -> ex
            .authenticationEntryPoint((req, res, e) -> {
              res.setStatus(401);
              res.setContentType("application/json");
              res.getWriter().write("{\"error\":\"Unauthorized\"}");
            })
        )
        .formLogin(form -> form
            .loginProcessingUrl("/login")
            .successHandler(loginSuccessHandler)
        )
        .logout(logout -> logout
            .logoutUrl("/logout")
            .logoutSuccessHandler((req, res, auth) -> {
              res.setStatus(204);
            })
        );

    return http.build();
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity http,
                                                     CustomUserDetailsService userDetailsService,
                                                     BCryptPasswordEncoder passwordEncoder) throws Exception {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder);

    return new ProviderManager(authProvider);
  }

  @Service
  public static class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
      User user = userRepository.findByEmail(email)
          .orElseThrow(() -> new UsernameNotFoundException("User not found"));

      if (!user.getIsActive()) {
        throw new UsernameNotFoundException("This account is not activated");
      }

      return org.springframework.security.core.userdetails.User
          .withUsername(user.getEmail())
          .password(user.getPasswordHash())
          .roles("USER")
          .disabled(user.getDeletedAt() != null)
          .build();
    }
  }
}