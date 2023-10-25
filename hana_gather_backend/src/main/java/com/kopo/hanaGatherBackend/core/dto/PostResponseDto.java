package com.kopo.hanaGatherBackend.core.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PostResponseDto {
    private Long postId;
    private String memberId;
    private String nickname;
    private String profileImage;

    private String content;
    private List<String> mediaFiles;

    private Long commentsCount;
    private LocalDateTime createdDate;

    public PostResponseDto(Long postId, String memberId, String nickname, String profileImage, String content, List<String> mediaFiles, Long commentsCount, LocalDateTime createdDate) {
        this.postId = postId;
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.content = content;
        this.mediaFiles = mediaFiles;
        this.commentsCount = commentsCount;
        this.createdDate = createdDate;
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

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<String> getMediaFiles() {
        return mediaFiles;
    }

    public void setMediaFiles(List<String> mediaFiles) {
        this.mediaFiles = mediaFiles;
    }

    public Long getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(Long commentsCount) {
        this.commentsCount = commentsCount;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
