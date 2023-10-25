package com.kopo.hanaGatherBackend.core.repository;


import com.kopo.hanaGatherBackend.core.entity.DutchPay;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface DutchPayRepository {

    void save(DutchPay dutchPay);

    DutchPay findById(@Param("id") Long id);

    DutchPay findFirstByMemberId(@Param("memberId") String memberId);

    List<DutchPay> findAllByMemberId(@Param("memberId") String memberId, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);

    List<DutchPay> findAllByMemberIdAndAllMemberNotPayed(@Param("memberId") String memberId, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);

}
