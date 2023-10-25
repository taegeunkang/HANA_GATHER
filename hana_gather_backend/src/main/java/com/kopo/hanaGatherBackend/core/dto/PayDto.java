package com.kopo.hanaGatherBackend.core.dto;

public class PayDto {
    private Long dutchPayId;
    private String to;

    private Long amount;

    public PayDto(Long dutchPayId, String to, Long amount) {
        this.dutchPayId = dutchPayId;
        this.to = to;
        this.amount = amount;
    }

    public Long getDutchPayId() {
        return dutchPayId;
    }

    public void setDutchPayId(Long dutchPayId) {
        this.dutchPayId = dutchPayId;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
