package com.cwc.vidforge.services.impl;

import com.cwc.vidforge.enums.Status;
import com.cwc.vidforge.model.VideoFile;
import com.cwc.vidforge.repository.VideoFileRepository;
import com.cwc.vidforge.services.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    private final VideoFileRepository videoFileRepository;

    public AdminServiceImpl(VideoFileRepository videoFileRepository) {
        this.videoFileRepository = videoFileRepository;
    }

    @Override
    public List<VideoFile> getAllVideosList() {
        return this.videoFileRepository.findAll();
    }
    @Override
    public VideoFile getVideoByVideoId(String videoId) {
       return this.videoFileRepository.findByVideoId(videoId).orElseThrow(()->new RuntimeException("Video not found"));
    }

    @Override
    public List<VideoFile> getVideosByStatus(Status status) {
        return videoFileRepository.findByStatusOrderByUploadTimeDesc(status);
    }

    @Override
    public void deleteVideoByVideoId(String videoId) {
        this.videoFileRepository.deleteById(videoId);
    }

    @Override
    public Page<VideoFile> getPaginatedVideos(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return videoFileRepository.findAll(pageable);
    }

    @Override
    public Page<VideoFile> getPaginatedVideosByStatus(Status status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return videoFileRepository.findByStatus(status, pageable);
    }
}
