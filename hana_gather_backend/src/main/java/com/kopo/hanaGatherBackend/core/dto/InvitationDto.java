package com.kopo.hanaGatherBackend.core.dto;

import java.util.List;

public class InvitationDto {
    private Long bandId;
    private List<String> members;

    public InvitationDto(Long bandId, List<String> members) {
        this.bandId = bandId;
        this.members = members;
    }

    public Long getBandId() {
        return bandId;
    }

    public void setBandId(Long bandId) {
        this.bandId = bandId;
    }

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }
}
