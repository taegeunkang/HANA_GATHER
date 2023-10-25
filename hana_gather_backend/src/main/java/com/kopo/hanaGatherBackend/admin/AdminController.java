package com.kopo.hanaGatherBackend.admin;

import com.kopo.hanaGatherBackend.admin.dto.AdminLoginDto;
import com.kopo.hanaGatherBackend.admin.dto.AdminReportResponseDto;
import com.kopo.hanaGatherBackend.admin.service.AdminService;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Controller
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/admin")
    public String hello() {
        return "operationStatus";
    }

    @GetMapping("/admin/home")
    public String adminLogin(HttpServletRequest request) {
        return "operationStatus";
    }

    @GetMapping("/admin/login")
    public String adminLogin() {
        return "home";
    }


    @PostMapping("/admin/login")
    public String adminLogin(HttpServletRequest request, Model model, @ModelAttribute AdminLoginDto adminLoginDto) {
        return adminService.login(request, model,adminLoginDto);
    }

    @GetMapping("/admin/logout")
    public String adminLogout(HttpServletRequest request) {
        return  adminService.logout(request);
    }

    @GetMapping("/admin/report")
    public String getReportList(Model model) {
        return adminService.getReportList(model);
    }

    @PostMapping("/admin/report/remove")
    public String removeReport(@RequestParam Long id) {


        return adminService.deleteReport(id);
    }

}
