package com.kopo.hanaGatherBackend.core.dto;

public class BandStatusResponseDto {

    private String title;
    private String owner;
    private String ownerNickname;
    private String ownerProfileImage;
    private String category;

    public BandStatusResponseDto(String title, String owner, String ownerNickname, String ownerProfileImage, String category) {
        this.title = title;
        this.owner = owner;
        this.ownerNickname = ownerNickname;
        this.ownerProfileImage = ownerProfileImage;
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getOwnerNickname() {
        return ownerNickname;
    }

    public void setOwnerNickname(String ownerNickname) {
        this.ownerNickname = ownerNickname;
    }

    public String getOwnerProfileImage() {
        return ownerProfileImage;
    }

    public void setOwnerProfileImage(String ownerProfileImage) {
        this.ownerProfileImage = ownerProfileImage;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
