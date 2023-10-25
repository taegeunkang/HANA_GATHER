package com.kopo.hanaGatherBackend.mobile.entity;

import java.time.LocalDateTime;

public class MobileVerification {
    String mobileNumber;
    String verificationKey;
    LocalDateTime expiredDate;
    Boolean verified;

    LocalDateTime createdDate;
    LocalDateTime modifiedDate;

    public MobileVerification(String mobileNumber, String verificationKey, LocalDateTime expiredDate, Boolean verified, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.mobileNumber = mobileNumber;
        this.verificationKey = verificationKey;
        this.expiredDate = expiredDate;
        this.verified = verified;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
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
