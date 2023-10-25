package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.BandMember;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BandMemberRepository {

    void save(BandMember bandMember);

    void updateInvitationStatusByBandIdAndMemberId(@Param("memberId") String memberId, @Param("bandId") Long bandId, @Param("invitationStatus") Boolean invitationStatus);

    List<BandMember> findAllByBandId(@Param("bandId") Long bandId);
    List<BandMember> findAllByBandIdAndMemberInfoNicknameContainingWordAndInvitationStatus(@Param("bandId") Long bandId, @Param("word") String word, @Param("invitationStatus") Boolean invitationStatus, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);
}
