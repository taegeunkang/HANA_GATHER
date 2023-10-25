package com.kopo.hanaGatherBackend.core.dto;

import java.util.List;

public class BandResponseDto {
    private Long bandId;
    private String title;
    private String category;

    private String thumbnail;
    private List<MemberProfile> members;

    public BandResponseDto(Long bandId, String title, String category, String thumbnail, List<MemberProfile> members) {
        this.bandId = bandId;
        this.title = title;
        this.category = category;
        this.thumbnail = thumbnail;
        this.members = members;
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

    public List<MemberProfile> getMembers() {
        return members;
    }

    public void setMembers(List<MemberProfile> members) {
        this.members = members;
    }
}
