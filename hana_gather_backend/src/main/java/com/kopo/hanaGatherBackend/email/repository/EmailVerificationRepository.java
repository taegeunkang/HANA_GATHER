package com.kopo.hanaGatherBackend.email.repository;

import com.kopo.hanaGatherBackend.email.entity.EmailVerification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

@Mapper
public interface EmailVerificationRepository {

    EmailVerification findEmailVerificationByEmail(@Param("email")String email);
    void deleteByEmail(@Param("email") String email);

    void save(@Param("email") String email, @Param("verificationKey") String verificationKey, @Param("expiredDate") LocalDateTime expiredDate , @Param("verified") Boolean verified, @Param("createdDate") LocalDateTime createdDate, @Param("modifiedDate") LocalDateTime modifiedDate);

    void updateEmailVerificationByEmail(@Param("email") String email, @Param("verificationKey") String verificationKey, @Param("expiredDate") LocalDateTime expiredDate, @Param("modifiedDate") LocalDateTime modifiedDate );

    void updateEmailVerificationVerifiedByEmail(@Param("email") String email, @Param("verified") Boolean verified);
}

