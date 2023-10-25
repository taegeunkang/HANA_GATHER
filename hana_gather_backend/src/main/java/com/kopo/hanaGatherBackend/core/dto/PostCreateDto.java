package com.kopo.hanaGatherBackend.core.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class PostCreateDto {
    private String content;
    private List<MultipartFile> mediaFiles;
    private List<MultipartFile> thumbnailFiles;

    private Long bandId;

    public PostCreateDto(String content, List<MultipartFile> mediaFiles, List<MultipartFile> thumbnailFiles, Long bandId) {
        this.content = content;
        this.mediaFiles = mediaFiles;
        this.thumbnailFiles = thumbnailFiles;
        this.bandId = bandId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<MultipartFile> getMediaFiles() {
        return mediaFiles;
    }

    public void setMediaFiles(List<MultipartFile> mediaFiles) {
        this.mediaFiles = mediaFiles;
    }

    public List<MultipartFile> getThumbnailFiles() {
        return thumbnailFiles;
    }

    public void setThumbnailFiles(List<MultipartFile> thumbnailFiles) {
        this.thumbnailFiles = thumbnailFiles;
    }

    public Long getBandId() {
        return bandId;
    }

    public void setBandId(Long bandId) {
        this.bandId = bandId;
    }
}
