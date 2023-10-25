package com.kopo.hanaGatherBackend.user.dto;

public class LoginDto {

    String email;
    String password;

    public LoginDto(String emailAddress, String password) {
        this.email = emailAddress;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {this.email = email;
    }

    public String getPassword() {return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
