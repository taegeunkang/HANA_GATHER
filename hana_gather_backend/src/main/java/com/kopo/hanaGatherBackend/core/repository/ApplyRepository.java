package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.Apply;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ApplyRepository {

    void save(Apply apply);

    Apply findById(@Param("bandId") Long bandId,@Param("memberId") String memberId);

    List<Apply> findAllByBandId(@Param("bandId") Long bandId, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);

    void deleteById(@Param("bandId") Long bandId,@Param("memberId") String memberId);

}
