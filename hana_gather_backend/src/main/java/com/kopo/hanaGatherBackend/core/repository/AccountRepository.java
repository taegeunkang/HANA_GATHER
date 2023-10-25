package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.Account;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

@Mapper
public interface AccountRepository {
    void save(@Param("accountNumber") String accountNumber, @Param("balance") Long balance, @Param("createdDate") LocalDateTime createdDate, @Param("modifiedDate") LocalDateTime modifiedDate);

    Account findById(@Param("accountNumber") String accountNumber);

    void addBalanceByAccountNumber(@Param("amount") Long amount, @Param("accountNumber") String accountNumber);
    void subBalanceByAccountNumber(@Param("amount") Long amount, @Param("accountNumber") String accountNumber);


}
