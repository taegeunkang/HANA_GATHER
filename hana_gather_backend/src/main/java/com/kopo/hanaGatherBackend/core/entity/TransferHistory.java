package com.kopo.hanaGatherBackend.core.entity;

import java.time.LocalDateTime;

public class TransferHistory {

    private Long id;
    private String sender;
    private String receiver;
    private Long amount;
    private Long senderBalance;

    private Long receiverBalance;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public TransferHistory(Long id, String sender, String receiver, Long amount, Long senderBalance, Long receiverBalance, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.senderBalance = senderBalance;
        this.receiverBalance = receiverBalance;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getSenderBalance() {
        return senderBalance;
    }

    public void setSenderBalance(Long senderBalance) {
        this.senderBalance = senderBalance;
    }

    public Long getReceiverBalance() {
        return receiverBalance;
    }

    public void setReceiverBalance(Long receiverBalance) {
        this.receiverBalance = receiverBalance;
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
