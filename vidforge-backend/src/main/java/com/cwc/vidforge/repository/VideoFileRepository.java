package com.cwc.vidforge.repository;

import com.cwc.vidforge.enums.Status;
import com.cwc.vidforge.model.VideoFile;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VideoFileRepository extends MongoRepository<VideoFile, String> {
    Optional<VideoFile> findByVideoId(String videoId);
    List<VideoFile> findByStatus(Status status);
    List<VideoFile> findByStatusOrderByUploadTimeDesc(Status status);
}
