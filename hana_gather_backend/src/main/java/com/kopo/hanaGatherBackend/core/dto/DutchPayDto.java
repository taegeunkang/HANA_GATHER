package com.kopo.hanaGatherBackend.core.dto;

import java.util.List;

public class DutchPayDto {

    private String requester;
    private Long totalAmount;
    private Long amountPerPerson;

    private List<String> member;

    public DutchPayDto(String requester, Long totalAmount, Long amountPerPerson, List<String> member) {
        this.requester = requester;
        this.totalAmount = totalAmount;
        this.amountPerPerson = amountPerPerson;
        this.member = member;
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
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

    public List<String> getMember() {
        return member;
    }

    public void setMember(List<String> member) {
        this.member = member;
    }
}
