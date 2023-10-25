package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.MeetingMember;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MeetingMemberRepository {
    void save(MeetingMember meetingMember);

    List<MeetingMember> findByMeetingId(@Param("meetingId") Long meetingId);

    void updatePayedAmountByMeetingIdAndMemberId(@Param("payedAmount") Long payedAmount, @Param("meetingId") Long meetingId, @Param("memberId") String memberId);


}
