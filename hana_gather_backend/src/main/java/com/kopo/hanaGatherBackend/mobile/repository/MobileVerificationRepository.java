package com.kopo.hanaGatherBackend.mobile.repository;

import com.kopo.hanaGatherBackend.mobile.entity.MobileVerification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;

@Mapper
public interface MobileVerificationRepository {

    MobileVerification findMobileVerificationByMobileNumber(@Param("mobileNumber") String mobileNumber);
    void deleteByMobileNumber(@Param("mobileNumber") String mobileNumber);

    void save(@Param("mobileNumber") String mobileNumber, @Param("verificationKey") String verificationKey, @Param("expiredDate") LocalDateTime expiredDate , @Param("verified") Boolean verified, @Param("createdDate") LocalDateTime createdDate, @Param("modifiedDate") LocalDateTime modifiedDate);

    void updateMobileVerificationByMobileNumber(@Param("mobileNumber") String mobileNumber, @Param("verificationKey") String verificationKey, @Param("expiredDate") LocalDateTime expiredDate, @Param("modifiedDate") LocalDateTime modifiedDate );

    void updateMobileVerificationVerifiedByMobileNumber(@Param("mobileNumber") String mobileNumber, @Param("verified") Boolean verified);
}

