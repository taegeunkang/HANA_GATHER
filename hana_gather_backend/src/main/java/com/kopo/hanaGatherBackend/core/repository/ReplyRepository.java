package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.Reply;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReplyRepository {
    void save(Reply reply);

    Long countCommentByPostId(@Param("postId") Long postId);

    List<Reply> findByPostIdAndReReplyIsNullOrderByCreatedDateAsc(@Param("postId") Long postId, @Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);
    List<Reply> findByPostIdAndReReplyOrderByCreatedDateAsc(@Param("postId") Long postId,@Param("reReply") Long reReply ,@Param("pageNumber") Long pageNumber, @Param("pageSize") Long pageSize);

    Long countCommentByReReply(@Param("reReply") Long reReply);
}
