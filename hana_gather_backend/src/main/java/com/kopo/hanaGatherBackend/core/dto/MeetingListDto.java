package com.kopo.hanaGatherBackend.core.dto;

import java.time.LocalDateTime;
import java.util.List;

public class MeetingListDto {
    private Long meetingId;
    private String title;
    private String locationName;

    private Double latitude;

    private Double longitude;

    private LocalDateTime meetingDate;

    private String virtualAccountNumber;
    private List<MemberProfile> members;

    private Long amount;

    public MeetingListDto(Long meetingId, String title, String locationName, Double latitude, Double longitude, LocalDateTime meetingDate, String virtualAccountNumber, List<MemberProfile> members, Long amount) {
        this.meetingId = meetingId;
        this.title = title;
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.meetingDate = meetingDate;
        this.virtualAccountNumber = virtualAccountNumber;
        this.members = members;
        this.amount = amount;
    }

    public Long getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(Long meetingId) {
        this.meetingId = meetingId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public LocalDateTime getMeetingDate() {
        return meetingDate;
    }

    public void setMeetingDate(LocalDateTime meetingDate) {
        this.meetingDate = meetingDate;
    }

    public String getVirtualAccountNumber() {
        return virtualAccountNumber;
    }

    public void setVirtualAccountNumber(String virtualAccountNumber) {
        this.virtualAccountNumber = virtualAccountNumber;
    }

    public List<MemberProfile> getMembers() {
        return members;
    }

    public void setMembers(List<MemberProfile> members) {
        this.members = members;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
