package com.kopo.hanaGatherBackend.core.dto;

public class BandSearchResponseDto {

    private Long bandId;
    private String title;
    private String category;

    private String thumbnail;

    private Byte status;

    public BandSearchResponseDto(Long bandId, String title, String category, String thumbnail, Byte status) {
        this.bandId = bandId;
        this.title = title;
        this.category = category;
        this.thumbnail = thumbnail;
        this.status = status;
    }

    public Long getBandId() {
        return bandId;
    }

    public void setBandId(Long bandId) {
        this.bandId = bandId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }
}
