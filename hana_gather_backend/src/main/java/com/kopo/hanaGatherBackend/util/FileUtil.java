package com.kopo.hanaGatherBackend.util;

import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRange;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class FileUtil {

    private final String FILE_PATH = "/files";

    public void makeFolder(String path) throws IOException {
        File folder = new File(path);
        Path p = Paths.get(path);
        if(!folder.exists()){
            Files.createDirectory(p);
        }
    }

    public String fileSave(MultipartFile mfile, String ext) throws IOException {
        byte[] file = mfile.getBytes();
        String fileName = UUID.randomUUID().toString() + "." + ext;
        String savePath = FILE_PATH + "/" + fileName;
        makeFolder(FILE_PATH);
        File localFile = new File(savePath);
        FileCopyUtils.copy(file, localFile);
        return fileName;
    }

    public byte[] getImage(String file) throws IOException {
        String path = FILE_PATH + "/" + file;
        File imageFile = new File(path);
        return Files.readAllBytes(imageFile.toPath());
    }

    public ResourceRegion getResourceRegion(String file, HttpHeaders headers) throws IOException {
        UrlResource video = new UrlResource("file:" + FILE_PATH + "/" + file);
        Long chunkSize =10000000L;
        Long contentLength = video.contentLength();
        HttpRange httpRange = headers.getRange().isEmpty() ? HttpRange.createByteRange(0) : headers.getRange().stream().findFirst().get();

        Long start = httpRange.getRangeStart(contentLength);
        Long end = httpRange.getRangeEnd(contentLength);
        Long rangeLength = Long.min(chunkSize, end - start + 1);
        return new ResourceRegion(video, start, rangeLength);
    }





}
