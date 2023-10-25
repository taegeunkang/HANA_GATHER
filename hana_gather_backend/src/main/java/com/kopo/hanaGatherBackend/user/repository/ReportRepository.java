package com.kopo.hanaGatherBackend.user.repository;

import com.kopo.hanaGatherBackend.user.entity.Report;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReportRepository {

    void save(Report report);

    List<Report> findAllOrderByCreatedDateDesc();

    void deleteById(@Param("id") Long id);
}
