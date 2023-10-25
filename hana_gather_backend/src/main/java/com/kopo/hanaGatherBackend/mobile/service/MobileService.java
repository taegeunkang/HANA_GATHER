package com.kopo.hanaGatherBackend.mobile.service;

import com.kopo.hanaGatherBackend.mobile.dto.MobileResponseDto;
import com.kopo.hanaGatherBackend.mobile.dto.VerificationResponseDto;
import com.kopo.hanaGatherBackend.mobile.entity.MobileVerification;
import com.kopo.hanaGatherBackend.mobile.exception.*;
import com.kopo.hanaGatherBackend.mobile.repository.MobileVerificationRepository;
import com.kopo.hanaGatherBackend.security.JWTUtil;
import com.kopo.hanaGatherBackend.user.entity.MemberInfo;
import com.kopo.hanaGatherBackend.user.repository.MemberInfoRepository;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.chrono.ChronoLocalDateTime;
import java.util.Random;

@Service
public class MobileService {
    private static final String API_KEY = "NCSE2RA5CYRKBM8N";
    private static final String SECRET = "ZF4O7RCCAR37IEGYLZPUVGIP9P9XHOPH";

    private static final String MESSAGE_REQUEST_URL = "https://api.coolsms.co.kr";
    private final DefaultMessageService messageService;

    private final MobileVerificationRepository mobileVerificationRepository;
    private final MemberInfoRepository memberInfoRepository;

    private final JWTUtil jwtUtil;


    public MobileService(MobileVerificationRepository mobileVerificationRepository, MemberInfoRepository memberInfoRepository, JWTUtil jwtUtil) {
        this.messageService = NurigoApp.INSTANCE.initialize(API_KEY, SECRET, MESSAGE_REQUEST_URL);
        this.mobileVerificationRepository = mobileVerificationRepository;
        this.memberInfoRepository = memberInfoRepository;
        this.jwtUtil = jwtUtil;
    }

    public void isMobileNumberVerifiedOrRecentlySent(String mobileNumber, String token) {
        MobileVerification mobileVerification = mobileVerificationRepository.findMobileVerificationByMobileNumber(mobileNumber);
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);
        if (mobileVerification != null && mobileVerification.getVerified() && (memberInfo != null && memberInfo.getAccountId() != null)) {
            throw new AlreadyVerifiedMobileNumberException();
        }
    }

    private void requestMessage(String mobileNumber, String key) {
        Message coolsms = new Message();
        coolsms.setFrom("01041047108");
        coolsms.setTo(mobileNumber);
        coolsms.setText("하나모여 인증번호는 " + key + "입니다.");

        messageService.sendOne(new SingleMessageSendingRequest(coolsms));
    }

    public synchronized MobileResponseDto sendMessage(String mobileNumber, String token) {
        isMobileNumberVerifiedOrRecentlySent(mobileNumber, token);
        String key = createKey();
        MobileVerification mobileVerification = mobileVerificationRepository.findMobileVerificationByMobileNumber(mobileNumber);
        LocalDateTime expiredDate = ZonedDateTime.now().plusMinutes(3L).toLocalDateTime();
        if(mobileVerification != null) {
            mobileVerificationRepository.updateMobileVerificationByMobileNumber(mobileNumber, key, expiredDate, LocalDateTime.now());
        }else {
            mobileVerificationRepository.save(mobileNumber, key, expiredDate, false, LocalDateTime.now(), LocalDateTime.now());
        }
        try {
            requestMessage(mobileNumber, key);
        }catch (Exception ex){
            throw new SendMessageFailedException();
        }
        return new MobileResponseDto(mobileNumber, expiredDate);
    }

    public VerificationResponseDto verifyKey(String mobileNumber, String key) {
        MobileVerification mobileVerification = mobileVerificationRepository.findMobileVerificationByMobileNumber(mobileNumber);
        if(mobileVerification == null) {
            throw new InvalidMobileNumberException();
        }
        if(mobileVerification.getExpiredDate().isBefore(ChronoLocalDateTime.from(ZonedDateTime.now()))) {
            throw new KeyExpiredException();
        }
        if (mobileVerification.getVerificationKey().equals(key)) {
            mobileVerificationRepository.updateMobileVerificationVerifiedByMobileNumber(mobileNumber, true);
            return new VerificationResponseDto(true);
        }

        throw new InvalidCodeException();

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
