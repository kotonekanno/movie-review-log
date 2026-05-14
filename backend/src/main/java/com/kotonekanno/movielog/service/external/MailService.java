package com.kotonekanno.movielog.service.external;

import com.kotonekanno.movielog.config.properties.FrontendProperties;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;

@Service
public class MailService {
  private final JavaMailSender mailSender;
  private final String frontendUrl;

  public MailService(
      JavaMailSender mailSender,
      FrontendProperties frontendProperties
  ) {
    this.mailSender = mailSender;
    this.frontendUrl = frontendProperties.getFrontendUrl();
  }

  // Send verification mail
  public void sendVerificationMail(String to, String token) {
    String verifyUrl = frontendUrl + "/verify?token=" + token;

    SimpleMailMessage message = new SimpleMailMessage();

    message.setTo(to);
    message.setSubject("映画記録アプリ　メールアドレス認証");
    message.setText(
        """
          メールアドレスを認証するには、
          下記のURLをクリックしてください。
          
          %s
        """.formatted(verifyUrl)
    );

    mailSender.send(message);
  }
}
