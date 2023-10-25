package com.kopo.hanaGatherBackend.core.dto;

public class BandUserSearchResponseDto {

    private String nickname;
    private String email;
    private String profileImage;

    private String accountNumber;

    private Byte status;

    public BandUserSearchResponseDto(String nickname, String email, String profileImage, String accountNumber, Byte status) {
        this.nickname = nickname;
        this.email = email;
        this.profileImage = profileImage;
        this.accountNumber = accountNumber;
        this.status = status;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }
}
