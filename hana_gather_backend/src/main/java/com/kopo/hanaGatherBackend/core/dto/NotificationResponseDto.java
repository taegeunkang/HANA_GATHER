package com.kopo.hanaGatherBackend.core.dto;

import java.time.LocalDateTime;

public class NotificationResponseDto {
    private Long id;
    private String message;
    private String memberId;

    private String profileImage;

    private Long dutchPayId;

    private Long bandId;

    private Boolean invitation;

    private LocalDateTime createdDate;

    public NotificationResponseDto(Long id, String message, String memberId, String profileImage, Long dutchPayId, Long bandId, Boolean invitation, LocalDateTime createdDate) {
        this.id = id;
        this.message = message;
        this.memberId = memberId;
        this.profileImage = profileImage;
        this.dutchPayId = dutchPayId;
        this.bandId = bandId;
        this.invitation = invitation;
        this.createdDate = createdDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Long getDutchPayId() {
        return dutchPayId;
    }

    public void setDutchPayId(Long dutchPayId) {
        this.dutchPayId = dutchPayId;
    }

    public Long getBandId() {
        return bandId;
    }

    public void setBandId(Long bandId) {
        this.bandId = bandId;
    }

    public Boolean getInvitation() {
        return invitation;
    }

    public void setInvitation(Boolean invitation) {
        this.invitation = invitation;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}

