package com.kopo.hanaGatherBackend.user.entity;

import java.time.LocalDateTime;

public class Report {
    private Long id;
    private Byte reportType;
    private String message;
    private String memberId;

    private LocalDateTime createdDate;

    private LocalDateTime modifiedDate;

    public Report(Long id, Byte reportType, String message, String memberId, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.reportType = reportType;
        this.message = message;
        this.memberId = memberId;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
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

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
}
