package com.kopo.hanaGatherBackend.admin.dto;

import java.time.LocalDateTime;

public class AdminReportResponseDto {

    private Long id;
    private Byte reportType;
    private String message;

    private String memberId;

    private String createdDate;

    public AdminReportResponseDto(Long id, Byte reportType, String message, String memberId, String createdDate) {
        this.id = id;
        this.reportType = reportType;
        this.message = message;
        this.memberId = memberId;
        this.createdDate = createdDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Byte getReportType() {
        return reportType;
    }

    public void setReportType(Byte reportType) {
        this.reportType = reportType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }
}
