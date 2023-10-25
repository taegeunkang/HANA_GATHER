package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.DutchPayMember;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.access.method.P;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface DutchPayMemberRepository {

    void save(DutchPayMember dutchPayMember);

    List<DutchPayMember> findByDutchPayId(@Param("dutchPayId") Long dutchPayId);

    void updatePayedAmountByDutchPayIdAndMemberId(@Param("payedAmount") Long payedAmount, @Param("dutchPayId") Long dutchPayId, @Param("memberId") String memberId);

}
