package com.kotonekanno.movielog.service.external;

import com.kotonekanno.movielog.config.properties.FrontendProperties;
import com.kotonekanno.movielog.config.properties.ResendProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class MailService {
  private final RestClient restClient;
  private final String frontendUrl;
  private final String apiKey;

  public MailService(
      RestClient.Builder builder,
      FrontendProperties frontendProperties,
      ResendProperties resendProperties
  ) {
    this.restClient = builder.baseUrl("https://api.resend.com").build();
    this.frontendUrl = frontendProperties.getFrontendUrl();
    this.apiKey = resendProperties.getApiKey();
  }

  // Send verification mail
  public void sendVerificationMail(String to, String token) {
    String verifyUrl = frontendUrl + "/verify?token=" + token;

    final String message = """
        映画記録をご利用いただきありがとうございます。
        
        
        アカウント登録を完了するには、
        以下のURLにアクセスしてメールアドレス認証を行ってください。
        
        %s
        
        ※このURLの有効期限は30分です。
        
        
        このメールに心当たりがない場合は、メールを破棄してください。
        
        ---
        映画記録
        %s
        """.formatted(verifyUrl, frontendUrl);

    Map<String, Object> body = Map.of(
        "from", "MovieLog <no-reply@mail.movielog.dev>",
        "to", to,
        "subject", "【映画記録】メールアドレス認証のお願い",
        "text", message
    );

    restClient.post()
      .uri("/emails")
      .header(HttpHeaders.AUTHORIZATION, "Bearer" + apiKey)
      .contentType(MediaType.APPLICATION_JSON)
      .body(body)
      .retrieve()
      .toBodilessEntity();
  }
}
