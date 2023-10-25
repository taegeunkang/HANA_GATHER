package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.Media;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MediaRepository {

    void save(Media media);

    List<Media> findAllByPostId(@Param("postId") Long postId);

    Media findByName(@Param("name") String name);

}
