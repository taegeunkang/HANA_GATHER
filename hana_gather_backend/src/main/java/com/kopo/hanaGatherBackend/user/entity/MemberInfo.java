package com.kopo.hanaGatherBackend.user.entity;


import java.time.LocalDateTime;

public class MemberInfo{

    private String memberId;
    private String nickname;
    private String accountId;

    private String profileImage;

    private String notificationToken;

    private Boolean isAdmin;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public MemberInfo(String memberId, String nickname, String accountId, String profileImage, String notificationToken, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.accountId = accountId;
        this.profileImage = profileImage;
        this.notificationToken = notificationToken;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public MemberInfo(String memberId, String nickname, String accountId, String profileImage, String notificationToken, Boolean isAdmin, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.accountId = accountId;
        this.profileImage = profileImage;
        this.notificationToken = notificationToken;
        this.isAdmin = isAdmin;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
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

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getNotificationToken() {
        return notificationToken;
    }

    public void setNotificationToken(String notificationToken) {
        this.notificationToken = notificationToken;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
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
