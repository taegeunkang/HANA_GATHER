package com.kopo.hanaGatherBackend.email.service;

import com.kopo.hanaGatherBackend.email.dto.EmailResponseDto;
import com.kopo.hanaGatherBackend.email.entity.EmailVerification;
import com.kopo.hanaGatherBackend.email.exception.*;
import com.kopo.hanaGatherBackend.email.repository.EmailVerificationRepository;
import com.kopo.hanaGatherBackend.user.entity.Member;
import com.kopo.hanaGatherBackend.user.repository.MemberRepository;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.chrono.ChronoLocalDateTime;
import java.util.Random;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final EmailVerificationRepository emailVerificationRepository;
    private final MemberRepository userRepository;

    public EmailService(JavaMailSender javaMailSender, EmailVerificationRepository emailRepository, MemberRepository userRepository) {
        this.javaMailSender = javaMailSender;
        this.emailVerificationRepository = emailRepository;
        this.userRepository = userRepository;
    }


    private MimeMessage createMessage(String to, String key) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, to);
        message.setSubject("하나모여 이메일 인증 코드: " + key);
        String msg = "";
        msg = msg + "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">이메일 인증</h1>";
        msg = msg + "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">아래 확인 코드를 하나모여 앱의 입력 화면에 입력하세요.</p>";
        msg = msg + "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        msg = msg + key;
        msg = msg + "</td></tr></tbody></table></div>";
        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress("deankang0918@gmail.com", "hanaGatherVerification"));
        return message;
    }

    public void isEmailVerifiedOrRecentlySent(String email) {
        Member member = userRepository.findMemberByEmail(email);
        if (member != null) {
            throw new AlreadyVerifiedEmailException();
        }
    }

    public synchronized EmailResponseDto sendMessage(String to) throws MessagingException, UnsupportedEncodingException {
        isEmailVerifiedOrRecentlySent(to);
        EmailVerification emailVerification = emailVerificationRepository.findEmailVerificationByEmail(to);
        String key = createKey();
        LocalDateTime expiredDate = ZonedDateTime.now().plusMinutes(3L).toLocalDateTime();
        if (emailVerification != null) {
            emailVerificationRepository.updateEmailVerificationByEmail(to,key, expiredDate, LocalDateTime.now());
        } else {
            emailVerificationRepository.save(to, key, expiredDate, false, LocalDateTime.now(), LocalDateTime.now());
        }
        MimeMessage message = createMessage(to, key);
        try {
            javaMailSender.send(message);
        }
        catch (MailException ex) {
            throw new SendEmailFailedException();
        }
        return new EmailResponseDto(to, expiredDate);
    }

    @Transactional
    public boolean verifyKey( String email, String key) {
        EmailVerification emailVerification = emailVerificationRepository.findEmailVerificationByEmail(email);
        if (emailVerification == null) {
            throw new InvalidEmailException();
        }
        if (emailVerification.getExpiredDate().isBefore(ChronoLocalDateTime.from(ZonedDateTime.now()))) {
            throw new KeyExpiredException();
        }
        if (emailVerification.getVerificationKey().equals(key)) {
            emailVerificationRepository.updateEmailVerificationVerifiedByEmail(email, true);
            return true;
        }
        throw new InvalidCodeException();
    }

    @Transactional
    public void isVerified(String emailAddress) {
        EmailVerification emailVerification = emailVerificationRepository.findEmailVerificationByEmail(emailAddress);
        if (emailVerification == null || !emailVerification.getVerified()) {
            throw new NotVerifiedEmailException();
        }
        emailVerificationRepository.deleteByEmail(emailVerification.getEmail());
    }

    public String createKey() {
        StringBuilder key = new StringBuilder();
        Random rnd = new Random();
        for (int i = 0; i < 6; ++i) {
            key.append(rnd.nextInt(10));
        }

        return key.toString();
    }


}
