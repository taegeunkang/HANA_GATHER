package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.Notification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NotificationRepository {

    void save(Notification notification);

    List<Notification> findByMemberId(@Param("memberId") String memberId, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);
}
