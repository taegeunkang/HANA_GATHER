package com.kopo.hanaGatherBackend.user.repository;

import com.kopo.hanaGatherBackend.user.entity.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.time.LocalDateTime;

@Mapper
public interface MemberRepository {
    Member findMemberByEmail(@Param("email") String email);

    void save(@Param("email") String email, @Param("password") String password, @Param("createdDate")LocalDateTime createdDate, @Param("modifiedDate") LocalDateTime modifiedDate);



}
