package com.kopo.hanaGatherBackend.user.dto;

import java.util.Date;

public class RefreshResponseDto {

    private String email;
    private String token;
    private Date tokenExpire;
    private String refreshToken;
    private Date refreshTokenExpire;

    public RefreshResponseDto(String username, String token, Date tokenExpire, String refreshToken, Date refreshTokenExpire) {
        this.email = username;
        this.token = token;
        this.tokenExpire = tokenExpire;
        this.refreshToken = refreshToken;
        this.refreshTokenExpire = refreshTokenExpire;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getTokenExpire() {
        return tokenExpire;
    }

    public void setTokenExpire(Date tokenExpire) {
        this.tokenExpire = tokenExpire;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Date getRefreshTokenExpire() {
        return refreshTokenExpire;
    }

    public void setRefreshTokenExpire(Date refreshTokenExpire) {
        this.refreshTokenExpire = refreshTokenExpire;
    }
}
