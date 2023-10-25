package com.kopo.hanaGatherBackend.email.entity;

import java.time.LocalDateTime;

public class EmailVerification {
    String email;
    String verificationKey;
    LocalDateTime expiredDate;
    Boolean verified;

    LocalDateTime createdDate;
    LocalDateTime modifiedDate;

    public EmailVerification(String email, String verificationKey, LocalDateTime expiredDate, Boolean verified, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.email = email;
        this.verificationKey = verificationKey;
        this.expiredDate = expiredDate;
        this.verified = verified;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVerificationKey() {
        return verificationKey;
    }

    public void setVerificationKey(String verificationKey) {
        this.verificationKey = verificationKey;
    }

    public LocalDateTime getExpiredDate() {
        return expiredDate;
    }

    public void setExpiredDate(LocalDateTime expiredDate) {
        this.expiredDate = expiredDate;
    }

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(LocalDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
}
