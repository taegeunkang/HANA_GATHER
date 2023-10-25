package com.kopo.hanaGatherBackend.core.dto;

public class MemberProfile {

    private String memberId;
    private String nickname;
    private String profileImage;

    private Boolean invitationStatus;

    private Boolean isOwner;

    public MemberProfile(String memberId, String nickname, String profileImage, Boolean invitationStatus, Boolean isOwner) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.invitationStatus = invitationStatus;
        this.isOwner = isOwner;
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

    public Boolean getInvitationStatus() {
        return invitationStatus;
    }

    public void setInvitationStatus(Boolean invitationStatus) {
        this.invitationStatus = invitationStatus;
    }

    public Boolean getOwner() {
        return isOwner;
    }

    public void setOwner(Boolean owner) {
        isOwner = owner;
    }
}
