package com.kopo.hanaGatherBackend.mobile.dto;

import java.time.LocalDateTime;

public class MobileResponseDto {
    String message;
    LocalDateTime expiredDate;

    public MobileResponseDto(String message, LocalDateTime expiredDate) {
        this.message = message;
        this.expiredDate = expiredDate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getExpiredDate() {
        return expiredDate;
    }

    public void setExpiredDate(LocalDateTime expiredDate) {
        this.expiredDate = expiredDate;
    }
}
