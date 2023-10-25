package com.kopo.hanaGatherBackend.core.dto;

import java.time.LocalDateTime;
import java.util.List;

public class DutchPayListVerticalResponseDto {

    private Long dutchPayId;
    private List<String> memberProfileImages;

    private Long totalAmount;

    private Boolean allPayed;

    private LocalDateTime createdDate;

    public DutchPayListVerticalResponseDto(Long dutchPayId, List<String> memberProfileImages, Long totalAmount, Boolean allPayed, LocalDateTime createdDate) {
        this.dutchPayId = dutchPayId;
        this.memberProfileImages = memberProfileImages;
        this.totalAmount = totalAmount;
        this.allPayed = allPayed;
        this.createdDate = createdDate;
    }

    public Long getDutchPayId() {
        return dutchPayId;
    }

    public void setDutchPayId(Long dutchPayId) {
        this.dutchPayId = dutchPayId;
    }

    public List<String> getMemberProfileImages() {
        return memberProfileImages;
    }

    public void setMemberProfileImages(List<String> memberProfileImages) {
        this.memberProfileImages = memberProfileImages;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Boolean getAllPayed() {
        return allPayed;
    }

    public void setAllPayed(Boolean allPayed) {
        this.allPayed = allPayed;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
