package com.kopo.hanaGatherBackend.user.dto;

public class ProfileResponseDto {
    private String email;
    private String nickname;

    private String profileImage;
    private String accountNumber;
    private Long balance;

    public ProfileResponseDto(String email, String nickname, String profileImage, String accountNumber, Long balance) {
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Long getBalance() {
        return balance;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
    }
}
