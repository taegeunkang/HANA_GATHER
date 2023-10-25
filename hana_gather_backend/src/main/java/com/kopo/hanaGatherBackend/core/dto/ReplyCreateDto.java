package com.kopo.hanaGatherBackend.core.dto;

public class ReplyCreateDto {
    private Long postId;
    private Long reReplyId;
    private String content;

    public ReplyCreateDto(Long postId, Long reReplyId, String content) {
        this.postId = postId;
        this.reReplyId = reReplyId;
        this.content = content;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
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
}
