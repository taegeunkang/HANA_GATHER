package com.kopo.hanaGatherBackend.core.entity;

import java.time.LocalDateTime;

public class Post {

    private Long id;
    private Long bandId;
    private String memberId;

    private String content;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;


    public Post(Long id, Long bandId, String memberId, String content, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.bandId = bandId;
        this.memberId = memberId;
        this.content = content;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBandId() {
        return bandId;
    }

    public void setBandId(Long bandId) {
        this.bandId = bandId;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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
