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
    message.setSubject("【映画記録】メールアドレス認証のお願い");
    message.setText(
        """
          映画記録をご利用いただきありがとうございます。
          
          アカウント登録を完了するには、
          以下のURLにアクセスしてメールアドレス認証を行ってください。
          
          %s
          
          ※このURLの有効期限は30分です。
          
          
          このメールに心当たりがない場合は、
          このメールを破棄してください。
          
          ---
          映画記録
          %s
        """.formatted(verifyUrl, frontendUrl)
    );

    mailSender.send(message);
  }
}
