package com.kopo.hanaGatherBackend.core.dto;

import java.time.LocalDateTime;
import java.util.List;

public class DutchPayStatusDto {
    private Long dutchPayId;

    private Long totalAmount;

    private String requester;
    private String requesterNickname;
    private String requesterProfileImage;

    private String requesterAccountNumber;

    private Long amountPerPerson;
    private List<PayStatusDto> members;

    private LocalDateTime createdDate;

    public DutchPayStatusDto(Long dutchPayId, Long totalAmount, String requester, String requesterNickname, String requesterProfileImage, String requesterAccountNumber, Long amountPerPerson, List<PayStatusDto> members, LocalDateTime createdDate) {
        this.dutchPayId = dutchPayId;
        this.totalAmount = totalAmount;
        this.requester = requester;
        this.requesterNickname = requesterNickname;
        this.requesterProfileImage = requesterProfileImage;
        this.requesterAccountNumber = requesterAccountNumber;
        this.amountPerPerson = amountPerPerson;
        this.members = members;
        this.createdDate = createdDate;
    }

    public Long getDutchPayId() {
        return dutchPayId;
    }

    public void setDutchPayId(Long dutchPayId) {
        this.dutchPayId = dutchPayId;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getRequester() {
        return requester;
    }

    public void setRequester(String requester) {
        this.requester = requester;
    }

    public String getRequesterNickname() {
        return requesterNickname;
    }

    public void setRequesterNickname(String requesterNickname) {
        this.requesterNickname = requesterNickname;
    }

    public String getRequesterProfileImage() {
        return requesterProfileImage;
    }

    public void setRequesterProfileImage(String requesterProfileImage) {
        this.requesterProfileImage = requesterProfileImage;
    }

    public String getRequesterAccountNumber() {
        return requesterAccountNumber;
    }

    public void setRequesterAccountNumber(String requesterAccountNumber) {
        this.requesterAccountNumber = requesterAccountNumber;
    }

    public Long getAmountPerPerson() {
        return amountPerPerson;
    }

    public void setAmountPerPerson(Long amountPerPerson) {
        this.amountPerPerson = amountPerPerson;
    }

    public List<PayStatusDto> getMembers() {
        return members;
    }

    public void setMembers(List<PayStatusDto> members) {
        this.members = members;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
