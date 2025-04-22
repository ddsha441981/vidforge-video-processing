package com.cwc.vidforge.services;

import com.cwc.vidforge.enums.Status;
import com.cwc.vidforge.model.VideoFile;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AdminService {

    List<VideoFile> getAllVideosList();
    VideoFile getVideoByVideoId(String videoId);
    List<VideoFile> getVideosByStatus(Status status);
    void deleteVideoByVideoId(String  videoId);
    Page<VideoFile> getPaginatedVideos(int page, int size);
    Page<VideoFile> getPaginatedVideosByStatus(Status status, int page, int size);

}
