package com.kopo.hanaGatherBackend.user.dto;

public class RefreshDto {

    private String email;
    private String refreshToken;

    public RefreshDto(String email, String refreshToken) {
        this.email = email;
        this.refreshToken = refreshToken;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
