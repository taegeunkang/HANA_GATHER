package com.kopo.hanaGatherBackend.security.dto;

import java.util.Date;

public class ErrorDto {

    private Date timestamp;
    private Integer status;
    private String code;
    private String message;


    public ErrorDto(Date timestamp, Integer status, String code, String message) {
        this.timestamp = timestamp;
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public Integer getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
