package com.kopo.hanaGatherBackend.core.dto;

public class PayStatusDto {
    private String memberId;
    private String nickname;
    private String profileImage;
    private Boolean payed;

    public PayStatusDto(String memberId, String nickname, String profileImage, Boolean payed) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.payed = payed;
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

    public Boolean getPayed() {
        return payed;
    }

    public void setPayed(Boolean payed) {
        this.payed = payed;
    }
}
