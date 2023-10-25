package com.kopo.hanaGatherBackend.core.dto;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.kopo.hanaGatherBackend.security.LocalDateTimeDeserializer;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public class CreateBandDto {
    private String title;

    private String category;

    private MultipartFile bandImage;

    public CreateBandDto(String title, String category, MultipartFile bandImage) {
        this.title = title;
        this.category = category;
        this.bandImage = bandImage;
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

    public MultipartFile getBandImage() {
        return bandImage;
    }

    public void setBandImage(MultipartFile bandImage) {
        this.bandImage = bandImage;
    }
}
