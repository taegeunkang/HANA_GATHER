package com.kopo.hanaGatherBackend.core.entity;

import java.time.LocalDateTime;

public class DutchPayMember {

    private Long dutchPayId;
    private String memberId;
    private Long payedAmount;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;


    public DutchPayMember(Long dutchPayId, String memberId, Long payedAmount, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.dutchPayId = dutchPayId;
        this.memberId = memberId;
        this.payedAmount = payedAmount;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getDutchPayId() {
        return dutchPayId;
    }

    public void setDutchPayId(Long dutchPayId) {
        this.dutchPayId = dutchPayId;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public Long getPayedAmount() {
        return payedAmount;
    }

    public void setPayedAmount(Long payedAmount) {
        this.payedAmount = payedAmount;
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
