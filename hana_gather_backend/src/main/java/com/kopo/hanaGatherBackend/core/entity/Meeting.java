package com.kopo.hanaGatherBackend.core.entity;

import java.time.LocalDateTime;

public class Meeting {

    private Long id;
    private LocalDateTime meetingDay;
    private Long amount;
    private Long bandId;
    private String locationName;

    private Double latitude;
    private Double longitude;

    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public Meeting(Long id, LocalDateTime meetingDay, Long amount, Long bandId, String locationName, Double latitude, Double longitude, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.id = id;
        this.meetingDay = meetingDay;
        this.amount = amount;
        this.bandId = bandId;
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getMeetingDay() {
        return meetingDay;
    }

    public void setMeetingDay(LocalDateTime meetingDay) {
        this.meetingDay = meetingDay;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getBandId() {
        return bandId;
    }

    public void setBandId(Long bandId) {
        this.bandId = bandId;
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
