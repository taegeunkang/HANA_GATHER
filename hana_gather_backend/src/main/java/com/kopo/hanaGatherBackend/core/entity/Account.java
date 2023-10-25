package com.kopo.hanaGatherBackend.core.entity;

import java.time.LocalDateTime;

public class Account {
    private String accountNumber;
    private Long balance;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public Account(String accountNumber, Long balance, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Long getBalance() {
        return balance;
    }

    public void setBalance(Long balance) {
        this.balance = balance;
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
