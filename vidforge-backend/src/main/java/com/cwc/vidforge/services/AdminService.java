package com.cwc.vidforge.services;

import com.cwc.vidforge.enums.Status;
import com.cwc.vidforge.model.VideoFile;

import java.util.List;

public interface AdminService {

    List<VideoFile> getAllVideosList();
    VideoFile getVideoByVideoId(String videoId);
    List<VideoFile> getVideosByStatus(Status status);
    void deleteVideoByVideoId(String  videoId);

}
