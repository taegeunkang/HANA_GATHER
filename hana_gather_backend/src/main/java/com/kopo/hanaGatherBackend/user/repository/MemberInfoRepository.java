package com.kopo.hanaGatherBackend.user.repository;

import com.kopo.hanaGatherBackend.user.entity.MemberInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface MemberInfoRepository  {

    MemberInfo findMemberInfoByNickname(@Param("nickname") String nickname);

    MemberInfo findMemberInfoByMemberId(@Param("memberId") String memberId);

    void save(@Param("memberId") String memberId, @Param("nickname") String nickname, @Param("profileImage") String profileImage, @Param("notificationToken") String notificationToken, @Param("createdDate") LocalDateTime createdDate, @Param("modifiedDate") LocalDateTime modifiedDate);

    void updateAccountIdByMemberId(@Param("accountId") String accountId,@Param("memberId") String memberId);

    List<MemberInfo> findByMemberIdContainingWord(@Param("word") String word, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);

    MemberInfo findByAccountId(@Param("accountNumber") String number);

    List<MemberInfo> findByMeetingMemberMeetingId(@Param("meetingId") Long meetingId);

    void updateNotificationTokenByMemberId(@Param("notificationToken") String notificationToken, @Param("memberId") String memberId);
}
