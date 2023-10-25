package com.kopo.hanaGatherBackend.user.dto;

public class RegisterDto {

    String email;
    String password;

    public RegisterDto(String emailAddress, String password, String nickname) {
        this.email = emailAddress;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
