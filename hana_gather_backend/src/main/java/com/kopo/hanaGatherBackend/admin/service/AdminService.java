package com.kopo.hanaGatherBackend.admin.service;

import com.kopo.hanaGatherBackend.admin.dto.AdminLoginDto;
import com.kopo.hanaGatherBackend.admin.dto.AdminReportResponseDto;
import com.kopo.hanaGatherBackend.user.entity.Member;
import com.kopo.hanaGatherBackend.user.entity.MemberInfo;
import com.kopo.hanaGatherBackend.user.entity.Report;
import com.kopo.hanaGatherBackend.user.repository.MemberInfoRepository;
import com.kopo.hanaGatherBackend.user.repository.MemberRepository;
import com.kopo.hanaGatherBackend.user.repository.ReportRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    private final MemberRepository memberRepository;

    private final MemberInfoRepository memberInfoRepository;

    private final ReportRepository reportRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(MemberRepository memberRepository, MemberInfoRepository memberInfoRepository, ReportRepository reportRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.memberInfoRepository = memberInfoRepository;
        this.reportRepository = reportRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Transactional(readOnly = true)
    public String login(HttpServletRequest httpServletRequest, Model model, AdminLoginDto adminLoginDto) {
        if(adminLoginDto.getId() == "" || adminLoginDto.getPassword() == "") {
            model.addAttribute("exception", "아이디/비밀번호를 입력해 주세요.");
            return "error";
        }

        Member member = memberRepository.findMemberByEmail(adminLoginDto.getId());
        if(member == null) {
            model.addAttribute("exception", "존재하지 않는 계정입니다.");
            return "error";
        }
        boolean isMatch = passwordEncoder.matches(adminLoginDto.getPassword(), member.getPassword());
        if (isMatch) {
            MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(member.getEmail());
            if(!memberInfo.getAdmin()) {
                model.addAttribute("exception", "권한이 없는 계정입니다.");
                return "error";
            }
            HttpSession session = httpServletRequest.getSession();
            session.setAttribute("sessionId", member.getEmail());
            return "redirect:/admin/home";

        } else {
            model.addAttribute("exception", "올바르지 않은 입력입니다.");
            return "error";
        }

    }

    public String logout(HttpServletRequest httpServletRequest) {
        httpServletRequest.getSession().removeAttribute("sessionId");

        return "redirect:/admin";
    }
    @Transactional(readOnly = true)
    public String getReportList(Model model) {
        List<Report> reportList = reportRepository.findAllOrderByCreatedDateDesc();

        List<AdminReportResponseDto> result = new ArrayList<>();

        for(Report report : reportList) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 a hh시 mm분");

            result.add(new AdminReportResponseDto(report.getId(), report.getReportType(), report.getMessage(), report.getMemberId(), report.getCreatedDate().format(formatter)));
        }

        model.addAttribute("reportList", result);

        return "manageMember";

    }

    @Transactional
    public String deleteReport(Long id) {
        reportRepository.deleteById(id);

        return "manageMember";
    }
}
