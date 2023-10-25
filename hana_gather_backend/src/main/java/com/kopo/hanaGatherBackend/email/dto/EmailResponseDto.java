package com.kopo.hanaGatherBackend.email.dto;

import java.time.LocalDateTime;

public class EmailResponseDto {
    String email;
    LocalDateTime expiredDate;

    public EmailResponseDto(String email, LocalDateTime expiredDate) {
        this.email = email;
        this.expiredDate = expiredDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getExpiredDate() {
        return expiredDate;
    }

    public void setExpiredDate(LocalDateTime expiredDate) {
        this.expiredDate = expiredDate;
    }
}
