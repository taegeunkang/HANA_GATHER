package com.kopo.hanaGatherBackend.core.dto;

public class HomeProfileResponseDto {
    private String nickname;
    private String profileImage;
    private Long balance;

    public HomeProfileResponseDto(String nickname, String profileImage, Long balance) {
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.balance = balance;
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

    public Long getBalance() {
        return balance;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }
}
