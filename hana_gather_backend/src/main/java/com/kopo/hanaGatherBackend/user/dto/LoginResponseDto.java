package com.kopo.hanaGatherBackend.user.dto;

import java.util.Date;

public class LoginResponseDto {
    private String email;
    private String token;
    private Date tokenExpire;
    private String refreshToken;
    private Date refreshTokenExpire;

    private Byte initStatus;

    public LoginResponseDto(String emailAddress, String token, Date tokenExpire, String refreshToken, Date refreshTokenExpire, Byte initStatus) {
        this.email = emailAddress;
        this.token = token;
        this.tokenExpire = tokenExpire;
        this.refreshToken = refreshToken;
        this.refreshTokenExpire = refreshTokenExpire;
        this.initStatus = initStatus;
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

    public Byte getInitStatus() {
        return initStatus;
    }

    public void setInitStatus(Byte initStatus) {
        this.initStatus = initStatus;
    }
}
