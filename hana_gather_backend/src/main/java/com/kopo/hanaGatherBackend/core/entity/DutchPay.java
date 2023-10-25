package com.kopo.hanaGatherBackend.core.entity;

import java.time.LocalDateTime;

public class DutchPay {
    private Long id;
    private String memberId;
    private Long totalAmount;
    private Long amountPerPerson;

    private String virtualAccountNumber;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public DutchPay(Long id, String memberId, Long totalAmount, Long amountPerPerson, String virtualAccountNumber, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.memberId = memberId;
        this.totalAmount = totalAmount;
        this.amountPerPerson = amountPerPerson;
        this.virtualAccountNumber = virtualAccountNumber;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Long getAmountPerPerson() {
        return amountPerPerson;
    }

    public void setAmountPerPerson(Long amountPerPerson) {
        this.amountPerPerson = amountPerPerson;
    }

    public String getVirtualAccountNumber() {
        return virtualAccountNumber;
    }

    public void setVirtualAccountNumber(String virtualAccountNumber) {
        this.virtualAccountNumber = virtualAccountNumber;
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
