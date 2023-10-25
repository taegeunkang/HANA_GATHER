package com.kopo.hanaGatherBackend.core.entity;

import java.time.LocalDateTime;

public class Apply {
    private String memberId;
    private Long bandId;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public Apply(String memberId, Long bandId, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.memberId = memberId;
        this.bandId = bandId;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public Long getBandId() {
        return bandId;
    }

    public void setBandId(Long bandId) {
        this.bandId = bandId;
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
