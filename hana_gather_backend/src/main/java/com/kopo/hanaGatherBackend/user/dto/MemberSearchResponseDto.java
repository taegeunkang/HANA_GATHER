package com.kopo.hanaGatherBackend.user.dto;

public class MemberSearchResponseDto {
    private String nickname;
    private String email;
    private String profileImage;

    private String accountNumber;

    public MemberSearchResponseDto(String nickname, String email, String profileImage, String accountNumber) {
        this.nickname = nickname;
        this.email = email;
        this.profileImage = profileImage;
        this.accountNumber = accountNumber;
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
}
