package com.kopo.hanaGatherBackend.email.dto;

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
