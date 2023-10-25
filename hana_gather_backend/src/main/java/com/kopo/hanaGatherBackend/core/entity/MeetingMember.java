package com.kopo.hanaGatherBackend.core.entity;

import java.time.LocalDateTime;

public class MeetingMember {
    private Long meetingId;
    private String memberId;
    private Long payedAmount;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public MeetingMember(Long meetingId, String memberId, Long payedAmount, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.meetingId = meetingId;
        this.memberId = memberId;
        this.payedAmount = payedAmount;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(Long meetingId) {
        this.meetingId = meetingId;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public Long getPayedAmount() {
        return payedAmount;
    }

    public void setPayedAmount(Long payedAmount) {
        this.payedAmount = payedAmount;
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
