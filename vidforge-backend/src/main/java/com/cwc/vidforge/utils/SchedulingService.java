package com.cwc.vidforge.utils;

import com.cwc.vidforge.enums.Status;
import com.cwc.vidforge.model.VideoFile;
import com.cwc.vidforge.repository.VideoFileRepository;
import com.cwc.vidforge.services.ProcessingService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class SchedulingService {

    private final VideoFileRepository videoFileRepository;

    private final ProcessingService processingService;

    public SchedulingService(VideoFileRepository videoFileRepository, ProcessingService processingService) {
        this.videoFileRepository = videoFileRepository;
        this.processingService = processingService;
    }

    // Execute every day at midnight
    @Scheduled(cron = "0 0 0 * * ?")
    public void cleanupOldFiles() {
        // clean up old file undder more than 30 days
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minus(30, ChronoUnit.DAYS);

        List<VideoFile> oldFiles = videoFileRepository.findAll();
        oldFiles.stream()
                .filter(file -> file.getUploadTime() != null && file.getUploadTime().isBefore(thirtyDaysAgo))
                .forEach(file -> {
                   try{
                       if (file.getStorageLocation() != null) {
                           Path path = Paths.get(file.getOriginalFilename());
                           Files.deleteIfExists(path);

                           Path parentDir = path.getParent();
                           if (Files.isDirectory(parentDir) && Files.list(parentDir).count() == 0) {
                               Files.delete(parentDir);
                           }
                       }
                       // Update status in database
                       file.setStatus(Status.ARCHIVED);
                       videoFileRepository.save(file);
                   }catch (IOException e) {
                       System.err.println("Error deleting file: " + e.getMessage());
                   }
                });
    }

    // Execute every 15 minutes
    @Scheduled(fixedRate = 900000)
    public void retryFailedJobs() {
        List<VideoFile> failedFiles = videoFileRepository.findByStatus(Status.FAILED);
        failedFiles.forEach(processingService::processVideo);
    }
}
