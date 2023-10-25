package com.kopo.hanaGatherBackend.core.repository;

import com.kopo.hanaGatherBackend.core.entity.Thumbnail;
import io.jsonwebtoken.impl.crypto.RsaSignatureValidator;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ThumbnailRepository {

    void save(Thumbnail thumbnail);

    Thumbnail findByMediaId(@Param("mediaId") Long mediaId);
}
