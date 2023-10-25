package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.Meeting;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface MeetingRepository {
    void save(Meeting meeting);

    Meeting findFirstBandId(@Param("bandId") Long bandId);

    Meeting findById(@Param("id") Long id);

    List<Meeting> findByMeetingMemberMemberId(@Param("memberId") String memberId, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);
    List<Meeting> findByMeetingMemberMemberIdAndBandMemberStatus(@Param("memberId") String memberId, @Param("invitationStatus") Boolean invitationStatus, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);

    List<LocalDateTime> findMeetingDayByBandId(@Param("bandId") Long bandId);

    List<Meeting> findByBandIdMeetingDayBeforeNow(@Param("bandId") Long bandId, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);
    List<Meeting> findAllByBandIdMeetingDayAfterNow(@Param("bandId") Long bandId);
    List<Meeting> findAllByBandIdMeetingDayAfterNowPage(@Param("bandId") Long bandId,  @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);



}
