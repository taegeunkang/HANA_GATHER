package com.kopo.hanaGatherBackend.core.dto;

import java.time.LocalDateTime;
import java.util.List;

public class DutchPayListResponseDto {

    private Long dutchPayId;
    private List<String> memberProfileImages;

    private Long totalAmount;

    private LocalDateTime createdDate;

    public DutchPayListResponseDto(Long dutchPayId, List<String> memberProfileImages, Long totalAmount, LocalDateTime createdDate) {
        this.dutchPayId = dutchPayId;
        this.memberProfileImages = memberProfileImages;
        this.totalAmount = totalAmount;
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

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
