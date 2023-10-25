package com.kopo.hanaGatherBackend.user;


import com.kopo.hanaGatherBackend.user.dto.*;
import com.kopo.hanaGatherBackend.user.service.MemberService;
import com.kopo.hanaGatherBackend.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.parser.ParseException;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequestMapping(value = "/user", produces = "application/json")
@RestController
public class MemberController {

    private final MemberService memberService;

    private final FileUtil fileUtil;

    public MemberController(MemberService memberService, FileUtil fileUtil) {
        this.memberService = memberService;
        this.fileUtil = fileUtil;
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterDto registerDto) {
        memberService.register(registerDto);
    }

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginDto loginDto) {
        return memberService.login(loginDto);
    }

    @PostMapping("/login/check")
    public Byte check(@RequestHeader("Authorization") String token) {
        return memberService.check(token);
    }

    @PostMapping("/refresh")
    public RefreshResponseDto refresh(@RequestBody RefreshDto refreshDto) {
        return memberService.reIssue(refreshDto);
    }

    @GetMapping("/nickname/duplicate")
    public void duplicate(@RequestParam String nickname) {
        memberService.isDuplicated(nickname);
    }
    @PostMapping("/profile")
    public ProfileResponseDto getProfile(@RequestHeader("Authorization") String token) {
        return memberService.getProfile(token);
    }

    @PostMapping("/profile/init")
    public void initProfile(@ModelAttribute ProfileinitDto profileinitDto, @RequestHeader("Authorization") String token) throws IOException {
       memberService.initProfile(profileinitDto, token);
    }

    @GetMapping("/profile/image")
    public byte[] watchProfileImage(@RequestParam String watch) throws IOException {
        return fileUtil.getImage(watch);
    }

    @PostMapping("/search")
    public List<MemberSearchResponseDto> searchMember(@RequestHeader("Authorization") String token, @RequestParam("word") String word, @RequestParam("page") Long page, @RequestParam("size") Long size) {
        return memberService.searchMember(token, word, page, size);
    }
    @PostMapping("/search/account")
    public MemberSearchResponseDto searhAccount( @RequestParam("account") String account) {
        return memberService.searchAccount(account);
    }

    @PostMapping("/notification/token/update")
    public void updateNotificationToken(@RequestHeader("Authorization") String token, @RequestParam String notificationToken) {
        memberService.updateNotificationToken(token, notificationToken);
    }

    @PostMapping("/report")
    public void reportMember(@RequestBody ReportMemberDto reportMemberDto) {
        memberService.report(reportMemberDto);
    }


}
