package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.TransferHistory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface TransferHistoryRepository {
    void save(TransferHistory transferHistory);

    List<TransferHistory> findByAccountNumber(@Param("accountNumber") String accountNumber, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);
}
