package com.kopo.hanaGatherBackend.core.dto;

import java.time.LocalDateTime;

public class ApplyListResponseDto {
    private Long bandId;
    private String memberId;
    private String nickname;
    private String profileImage;
    private LocalDateTime createdDate;

    public ApplyListResponseDto(Long bandId, String memberId, String nickname, String profileImage, LocalDateTime createdDate) {
        this.bandId = bandId;
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.createdDate = createdDate;
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

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
