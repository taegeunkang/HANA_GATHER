package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostRepository {

    void save(Post post);

    List<Post> findByBandIdOrderByCreatedDate(@Param("bandId") Long bandId, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);
}
