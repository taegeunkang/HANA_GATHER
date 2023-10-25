package com.kopo.hanaGatherBackend.core.entity;

import java.time.LocalDateTime;

public class Reply {
    private Long id;
    private String content;
    private Long reReply;
    private Long postId;
    private String memberId;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public Reply(Long id, String content, Long reReply, Long postId, String memberId, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.content = content;
        this.reReply = reReply;
        this.postId = postId;
        this.memberId = memberId;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getReReply() {
        return reReply;
    }

    public void setReReply(Long reReply) {
        this.reReply = reReply;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
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
