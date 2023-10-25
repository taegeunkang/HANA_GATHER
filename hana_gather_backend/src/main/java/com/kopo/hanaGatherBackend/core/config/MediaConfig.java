package com.kopo.hanaGatherBackend.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
public class MediaConfig {
    private final Long FILE_MAX_UPLOAD_SIZE = 524288000L; // 1024 * 1024* 100 * 5; 500메가
    @Bean
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver commonsMultipartResolver = new CommonsMultipartResolver();
        commonsMultipartResolver.setMaxUploadSize(FILE_MAX_UPLOAD_SIZE);
        return commonsMultipartResolver;
    }
}
