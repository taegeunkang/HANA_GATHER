package com.kopo.hanaGatherBackend.mobile.dto;

public class VerificationResponseDto {
    Boolean verified;

    public VerificationResponseDto(Boolean verified) {
        this.verified = verified;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }
}
