package com.kopo.hanaGatherBackend.core.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.kopo.hanaGatherBackend.security.LocalDateTimeDeserializer;

import java.time.LocalDateTime;
import java.util.List;

public class CreateMeetingDto {
    private Long bandId;

    private String locationName;
    private Double latitude;
    private Double longitude;
    private List<String> member;

    private Long amount;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private List<LocalDateTime> days;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime time;

    public CreateMeetingDto(Long bandId, String locationName, Double latitude, Double longitude, List<String> member, Long amount, List<LocalDateTime> days, LocalDateTime time) {
        this.bandId = bandId;
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.member = member;
        this.amount = amount;
        this.days = days;
        this.time = time;
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

    public List<String> getMember() {
        return member;
    }

    public void setMember(List<String> member) {
        this.member = member;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public List<LocalDateTime> getDays() {
        return days;
    }

    public void setDays(List<LocalDateTime> days) {
        this.days = days;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
