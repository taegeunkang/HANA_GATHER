package com.kopo.hanaGatherBackend.user.service;

import com.kopo.hanaGatherBackend.email.service.EmailService;
import com.kopo.hanaGatherBackend.security.JWTUtil;
import com.kopo.hanaGatherBackend.user.dto.*;
import com.kopo.hanaGatherBackend.core.entity.Account;
import com.kopo.hanaGatherBackend.user.entity.Member;
import com.kopo.hanaGatherBackend.user.entity.MemberInfo;
import com.kopo.hanaGatherBackend.user.entity.Report;
import com.kopo.hanaGatherBackend.user.exception.*;
import com.kopo.hanaGatherBackend.core.repository.AccountRepository;
import com.kopo.hanaGatherBackend.user.repository.MemberInfoRepository;
import com.kopo.hanaGatherBackend.user.repository.MemberRepository;
import com.kopo.hanaGatherBackend.core.repository.TransferHistoryRepository;
import com.kopo.hanaGatherBackend.user.repository.ReportRepository;
import com.kopo.hanaGatherBackend.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    private final JWTUtil jwtUtil;
    private final MemberInfoRepository memberInfoRepository;
    private final AccountRepository accountRepository;

    private final ReportRepository reportRepository;

    private final EmailService emailService;

    private final FileUtil fileUtil;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, JWTUtil jwtUtil, MemberInfoRepository memberInfoRepository, AccountRepository accountRepository, ReportRepository reportRepository, EmailService emailService, FileUtil fileUtil) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.memberInfoRepository = memberInfoRepository;
        this.accountRepository = accountRepository;
        this.reportRepository = reportRepository;
        this.emailService = emailService;
        this.fileUtil = fileUtil;
    }

    @Transactional(readOnly = true)
    public LoginResponseDto login(LoginDto loginDto) {
        Member member = memberRepository.findMemberByEmail(loginDto.getEmail());
        if (member == null) throw new UserNotFoundException();

        boolean isMatch = passwordEncoder.matches(loginDto.getPassword(), member.getPassword());
        if (isMatch) {
            Map<String, String> tokens = jwtUtil.generateTokens(loginDto.getEmail());
            String token = tokens.get("token");
            String refreshToken = tokens.get("refreshToken");
            Byte status;


            MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(loginDto.getEmail());

            if(memberInfo == null){ // 첫 로그인 일 때
                status = 1;
            } else if (memberInfo.getAccountId() == null) { // 닉네임, 프로필 사진만 지정하고 계좌 연동을 하지 않았을 때
                status = 2;
            } else { // 온보딩 설정이 완료된 상태
                status = 3;
            }


            return new LoginResponseDto(loginDto.getEmail(), token, jwtUtil.getExp(token), refreshToken, jwtUtil.getExp(refreshToken),status );

        } else {
            throw new PasswordNotCorrectException();
        }

    }
    @Transactional(readOnly = true)
    public Byte check(String token) {
        String subject = jwtUtil.getSubject(token.substring(7));

        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);
        Byte status;
        if(memberInfo == null){ // 첫 로그인 일 때
            status = 1;
        } else if (memberInfo.getAccountId() == null) { // 닉네임, 프로필 사진만 지정하고 계좌 연동을 하지 않았을 때
            status = 2;
        } else { // 온보딩 설정이 완료된 상태
            status = 3;
        }

        return status;

    }


    @Transactional
    public void register(RegisterDto registerDto) {
        isRegisterAvailable(registerDto);

        registerDto.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        memberRepository.save(registerDto.getEmail(), registerDto.getPassword(), LocalDateTime.now(), LocalDateTime.now());
    }

    public RefreshResponseDto reIssue(RefreshDto refreshDto) {
        String refreshTokenUsername = jwtUtil.getSubject(refreshDto.getRefreshToken().substring(7));

        if (refreshDto.getEmail().equals(refreshTokenUsername)) {
            Map<String, String> tokens = jwtUtil.generateTokens(refreshTokenUsername);
            String token = tokens.get("token");
            String refreshToken = tokens.get("refreshToken");

            return new RefreshResponseDto(refreshTokenUsername, token, jwtUtil.getExp(token), refreshToken, jwtUtil.getExp(refreshToken));

        } else {
            log.info("reIssue fail");
            throw new TokenNotMatchException();
        }
    }

    private void isRegisterAvailable(RegisterDto registerDto) {
        emailService.isVerified(registerDto.getEmail());
        Member member = memberRepository.findMemberByEmail(registerDto.getEmail());
        if (member != null) throw new UserExistsException();
    }
    @Transactional(readOnly = true)
    public void isDuplicated(String nickname) {
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByNickname(nickname);
        if (memberInfo != null) throw new NicknameExistsException();
    }


    @Transactional
    public void initProfile(ProfileinitDto profileinitDto, String token) throws IOException {
        isDuplicated(profileinitDto.getNickname());
        String email = jwtUtil.getSubject(token.substring(7));
        String fileName = "default-profile.png";
        if(profileinitDto.getProfileImage() != null) {
            fileName = fileUtil.fileSave(profileinitDto.getProfileImage(), "png");
        }
        MemberInfo memberInfo = new MemberInfo(email, profileinitDto.getNickname(),null,fileName, null, LocalDateTime.now(), LocalDateTime.now());
        memberInfoRepository.save(email, profileinitDto.getNickname(),fileName, null, LocalDateTime.now(), LocalDateTime.now());

    }
    @Transactional(readOnly = true)
    public MemberInfo extractMemberInfoFromToken(String token) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);

        if(memberInfo == null) throw new UserNotFoundException();
        return memberInfo;
    }
    @Transactional(readOnly = true)
    public ProfileResponseDto getProfile(String token) {
        MemberInfo memberInfo = extractMemberInfoFromToken(token);
        Account account = accountRepository.findById(memberInfo.getAccountId());

        return new ProfileResponseDto(memberInfo.getMemberId(), memberInfo.getNickname(), memberInfo.getProfileImage(), account.getAccountNumber(), account.getBalance());

    }

    @Transactional
    public List<MemberSearchResponseDto> searchMember(String token, String word, Long page, Long size) {
        String email = jwtUtil.getSubject(token.substring(7));
        List<MemberInfo> memberInfoList = memberInfoRepository.findByMemberIdContainingWord(word, page, size);
        List<MemberSearchResponseDto> memberSearchResponseDtoList = new ArrayList<>();

        for(MemberInfo memberInfo : memberInfoList) {
            if(!memberInfo.getMemberId().equals(email))
                memberSearchResponseDtoList.add(new MemberSearchResponseDto(memberInfo.getNickname(), memberInfo.getMemberId(), memberInfo.getProfileImage(), memberInfo.getAccountId()));
        }

        return memberSearchResponseDtoList;

    }

    @Transactional(readOnly = true)
    public MemberSearchResponseDto searchAccount(String account) {

        MemberInfo memberInfo = memberInfoRepository.findByAccountId(formatAccountNumber(account));
        if(memberInfo == null) throw new UserNotFoundException();

        return new MemberSearchResponseDto(memberInfo.getNickname(), memberInfo.getMemberId(), memberInfo.getProfileImage(), memberInfo.getAccountId());
    }
    @Transactional
    public void updateNotificationToken(String token, String notificationToken) {
        String subject = jwtUtil.getSubject(token.substring(7));
        memberInfoRepository.updateNotificationTokenByMemberId(notificationToken, subject);
        log.info("토큰 업데이트");
    }

    @Transactional
    public void report(ReportMemberDto reportMemberDto) {
        reportRepository.save(new Report(null, reportMemberDto.getReportType(), reportMemberDto.getMessage(), reportMemberDto.getMemberId(), LocalDateTime.now(), LocalDateTime.now()));
    }

    private String formatAccountNumber(String input) {

        String part1 = input.substring(0, 3);
        String part2 = input.substring(3, 9);
        String part3 = input.substring(9, 14);

        return String.format("%s-%s-%s", part1, part2, part3);
    }
}
