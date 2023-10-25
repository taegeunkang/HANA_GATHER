package com.kopo.hanaGatherBackend.core.dto;

import java.time.LocalDateTime;

public class TransferHistoryResponseDto {
    private Long id;
    private String nickname;
    private Long amount;

    private Long balance;
    private LocalDateTime createdDate;
    private Byte status;

    public TransferHistoryResponseDto(Long id, String nickname, Long amount, Long balance, LocalDateTime createdDate, Byte status) {
        this.id = id;
        this.nickname = nickname;
        this.amount = amount;
        this.balance = balance;
        this.createdDate = createdDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
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

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }
}
