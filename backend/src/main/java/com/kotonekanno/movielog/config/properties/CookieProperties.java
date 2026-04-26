package com.kotonekanno.movielog.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.cookie")
@Getter
@Setter
public class CookieProperties {
  private Boolean secure;
  private String sameSite;
}
