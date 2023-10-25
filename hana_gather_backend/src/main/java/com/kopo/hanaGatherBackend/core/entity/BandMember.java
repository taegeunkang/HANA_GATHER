package com.kopo.hanaGatherBackend.core.entity;

import java.time.LocalDateTime;

public class BandMember {
    private Long bandId;
    private String memberId;
    private Boolean invitationStatus;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public BandMember(Long bandId, String memberId, Boolean invitationStatus, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.bandId = bandId;
        this.memberId = memberId;
        this.invitationStatus = invitationStatus;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getBandId() {
        return bandId;
    }

    public void setBandId(Long bandId) {
        this.bandId = bandId;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public Boolean getInvitationStatus() {
        return invitationStatus;
    }

    public void setInvitationStatus(Boolean invitationStatus) {
        this.invitationStatus = invitationStatus;
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
