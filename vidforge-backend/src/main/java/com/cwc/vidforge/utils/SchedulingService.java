package com.cwc.vidforge.utils;

import com.cwc.vidforge.enums.Status;
import com.cwc.vidforge.model.VideoFile;
import com.cwc.vidforge.repository.VideoFileRepository;
import com.cwc.vidforge.services.ProcessingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(SchedulingService.class);

    private final VideoFileRepository videoFileRepository;

    private final ProcessingService processingService;

    public SchedulingService(VideoFileRepository videoFileRepository, ProcessingService processingService) {
        this.videoFileRepository = videoFileRepository;
        this.processingService = processingService;
    }

    // Execute every day at midnight
    @Scheduled(cron = "0 0 0 * * ?")
//    @Scheduled(cron = "0 * * * * ?") // Run every min
    public void cleanupOldFiles() {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minus(30, ChronoUnit.DAYS);
        List<VideoFile> allFiles = videoFileRepository.findAll();

        long deletedCount = allFiles.stream()
                .filter(file -> file.getUploadTime() != null && file.getUploadTime().isBefore(thirtyDaysAgo))
                .map(file -> {
                    try {
                        if (file.getStorageLocation() != null) {
                            Path path = Paths.get(file.getOriginalFilename());

                            if (Files.exists(path)) {
                                Files.delete(path);
                                Path parentDir = path.getParent();
                                if (Files.isDirectory(parentDir) && Files.list(parentDir).count() == 0) {
                                    Files.delete(parentDir);
                                }
                                file.setStatus(Status.ARCHIVED);
                                videoFileRepository.save(file);
                                logger.info("Deleted file: " , path);
                                return true;
                            } else {
                                logger.warn("File not found for deletion: " , path);
                            }
                        }
                    } catch (IOException e) {
                        logger.error("Error deleting file: " , e.getMessage());
                    }
                    return false;
                })
                .filter(Boolean::booleanValue)
                .count();

        if (deletedCount == 0) {
            logger.info("No old files found for deletion.");
        } else {
            logger.info("Total files deleted: " , deletedCount);
        }
    }


    // Execute every 15 minutes
    @Scheduled(fixedRate = 900000)
    public void retryFailedJobs() {
        List<VideoFile> failedFiles = videoFileRepository.findByStatus(Status.FAILED);
        failedFiles.forEach(processingService::processVideo);
    }
}
