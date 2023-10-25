package com.kopo.hanaGatherBackend.user.dto;

import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;

public class ProfileinitDto {
    private String nickname;
    private MultipartFile profileImage;

    public ProfileinitDto(String nickname, MultipartFile profileImage) {
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public MultipartFile getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(MultipartFile profileImage) {
        this.profileImage = profileImage;
    }
}
