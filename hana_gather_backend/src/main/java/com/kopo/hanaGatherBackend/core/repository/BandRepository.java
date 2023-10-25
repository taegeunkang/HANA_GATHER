package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.Band;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

@Mapper
public interface BandRepository {

    void save(Band band);

    Band findFirstByOwner(@Param("owner") String owner);

    Band findById(@Param("id") Long id);

    List<Band> findByTitleContaining(@Param("word") String word, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);

    List<Band> findAllByBandMemberMemberId(@Param("memberId") String memberId, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);
    List<Band> findByBandMemberMemberIdInvitationStatus(@Param("memberId") String memberId, @Param("invitationStatus") Boolean invitationStatus,  @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);

}
