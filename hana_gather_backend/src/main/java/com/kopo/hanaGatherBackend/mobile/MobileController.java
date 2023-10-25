package com.kopo.hanaGatherBackend.mobile;

import com.kopo.hanaGatherBackend.mobile.dto.MobileResponseDto;
import com.kopo.hanaGatherBackend.mobile.dto.VerificationResponseDto;
import com.kopo.hanaGatherBackend.mobile.service.MobileService;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RequestMapping("/mobile")
@RestController
public class MobileController {


    private final MobileService mobileService;

    public MobileController(MobileService mobileService) {
        this.mobileService = mobileService;
    }
    @PostMapping("/send")
    MobileResponseDto requestMessage(@RequestParam String mobile, @RequestHeader("Authorization") String token) {
        return mobileService.sendMessage(mobile, token);
    }
    @PostMapping("/verify")
    VerificationResponseDto verifyMessage(@RequestParam String mobile, @RequestParam String key) {
        return mobileService.verifyKey(mobile, key);
    }
}
