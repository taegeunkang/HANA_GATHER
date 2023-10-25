package com.kopo.hanaGatherBackend.core.dto;

import java.time.LocalDateTime;

public class ReplyListResponseDto {

    private Long replyId;
    private Long reReplyId;

    private String content;
    private String writer;

    private String writerNickname;
    private String profileImage;

    private Long reReplyCount;

    private LocalDateTime createdDate;

    public ReplyListResponseDto(Long replyId, Long reReplyId, String content, String writer, String writerNickname, String profileImage, Long reReplyCount, LocalDateTime createdDate) {
        this.replyId = replyId;
        this.reReplyId = reReplyId;
        this.content = content;
        this.writer = writer;
        this.writerNickname = writerNickname;
        this.profileImage = profileImage;
        this.reReplyCount = reReplyCount;
        this.createdDate = createdDate;
    }

    public Long getReplyId() {
        return replyId;
    }

    public void setReplyId(Long replyId) {
        this.replyId = replyId;
    }

    public Long getReReplyId() {
        return reReplyId;
    }

    public void setReReplyId(Long reReplyId) {
        this.reReplyId = reReplyId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public String getWriterNickname() {
        return writerNickname;
    }

    public void setWriterNickname(String writerNickname) {
        this.writerNickname = writerNickname;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Long getReReplyCount() {
        return reReplyCount;
    }

    public void setReReplyCount(Long reReplyCount) {
        this.reReplyCount = reReplyCount;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
