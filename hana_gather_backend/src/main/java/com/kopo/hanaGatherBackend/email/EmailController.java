package com.kopo.hanaGatherBackend.email;

import com.kopo.hanaGatherBackend.email.dto.EmailResponseDto;
import com.kopo.hanaGatherBackend.email.dto.VerificationResponseDto;
import com.kopo.hanaGatherBackend.email.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RequestMapping("/email")
@RestController
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }
    @GetMapping("/send")
    EmailResponseDto requestEmail(@RequestParam String email) throws MessagingException, UnsupportedEncodingException {
        return emailService.sendMessage(email);
    }
    @GetMapping("/verify")
    VerificationResponseDto verifyEmail(@RequestParam String email, @RequestParam String key) {
        return new VerificationResponseDto(emailService.verifyKey(email, key));
    }
}
