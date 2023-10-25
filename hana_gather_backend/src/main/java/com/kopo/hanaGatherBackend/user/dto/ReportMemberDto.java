package com.kopo.hanaGatherBackend.user.dto;

public class ReportMemberDto {
    private String memberId;
    private Byte reportType;
    private String message;


    public ReportMemberDto(String memberId, Byte reportType, String message) {
        this.memberId = memberId;
        this.reportType = reportType;
        this.message = message;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
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
}
