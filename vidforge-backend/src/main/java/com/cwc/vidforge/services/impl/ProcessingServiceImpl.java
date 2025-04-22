package com.cwc.vidforge.services.impl;

import com.cwc.vidforge.enums.Status;
import com.cwc.vidforge.model.Metadata;
import com.cwc.vidforge.model.VideoFile;
import com.cwc.vidforge.repository.VideoFileRepository;
import com.cwc.vidforge.services.ProcessingService;
import com.cwc.vidforge.utils.NotificationService;
import com.cwc.vidforge.utils.VideoProcessingUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

@Service
public class ProcessingServiceImpl implements ProcessingService {

    private final VideoFileRepository videoFileRepository;

    private final NotificationService notificationService;

    private final ExecutorService executorService;
    private final VideoProcessingUtils videoProcessingUtils;

    public ProcessingServiceImpl(VideoFileRepository videoFileRepository, NotificationService notificationService, VideoProcessingUtils videoProcessingUtils) {
        this.videoFileRepository = videoFileRepository;
        this.notificationService = notificationService;
        this.videoProcessingUtils = videoProcessingUtils;
        this.executorService = Executors.newFixedThreadPool(3);
    }

    public void processVideo(VideoFile videoFile) {
        videoFile.setStatus(Status.PROCESSING);
        videoFileRepository.save(videoFile);

        // Notify that processing has started
        notificationService.sendProgressUpdate(videoFile.getId(), "Processing started");

        // Create a list of tasks to perform on the video
        List<Callable<String>> tasks = new ArrayList<>();
        tasks.add(() -> performFormatConversion(videoFile));
        tasks.add(() -> extractMetadata(videoFile));
        tasks.add(() -> generateThumbnail(videoFile));

        try {
            // Submit all tasks for parallel execution and wait for all to complete
            List<Future<String>> results = executorService.invokeAll(tasks);

            StringBuilder processingDetails = new StringBuilder();
            boolean hasFailures = false;

            // Check results and build processing details
            for (Future<String> result : results) {
                try {
                    String details = result.get();
                    processingDetails.append(details).append("\n");
                } catch (ExecutionException e) {
                    hasFailures = true;
                    processingDetails.append("Task failed: ").append(e.getCause().getMessage()).append("\n");
                }
            }

            // Update video file status based on processing results
            videoFile.setProcessingDetails(processingDetails.toString());
            videoFile.setProcessedTime(LocalDateTime.now());
            videoFile.setStatus(hasFailures ? Status.PARTIALLY_COMPLETED : Status.COMPLETED);
            videoFileRepository.save(videoFile);

            // Send completion notification
            notificationService.sendProcessingComplete(videoFile.getId(),
                    hasFailures ? "Processing completed with some failures" : "Processing completed successfully");

        } catch (InterruptedException e) {
            videoFile.setStatus(Status.FAILED);
            videoFile.setProcessingDetails("Processing was interrupted: " + e.getMessage());
            videoFileRepository.save(videoFile);

            notificationService.sendProcessingComplete(videoFile.getId(), "Processing failed");

            Thread.currentThread().interrupt();
        }
    }

    private String performFormatConversion(VideoFile videoFile) throws InterruptedException {
        // format conversion taking some time
        Thread.sleep(2000);
        notificationService.sendProgressUpdate(videoFile.getId(), "Format conversion: 50% complete");
        Thread.sleep(2000);
        return "Format conversion completed";
    }

    private String extractMetadata(VideoFile videoFile) {
        //  metadata extraction
        try {
            Metadata metadata = videoProcessingUtils.extractMetadata(videoFile.getStorageLocation());
            videoFile.setFormat(metadata.getFormat());
            videoFile.setDuration(metadata.getDuration());
            videoFile.setCodec(metadata.getCodec());
            videoFile.setResolution(metadata.getResolution());
            Thread.sleep(1500);
            notificationService.sendProgressUpdate(videoFile.getId(), "Metadata extraction: in progress");
            Thread.sleep(1500);
            return "Metadata extraction completed:  " + metadata.toString();
        } catch (Exception e) {
            throw new RuntimeException("Metadata extraction failed: " + e.getMessage(), e);
        }

    }


    private String generateThumbnail(VideoFile videoFile) throws InterruptedException {
        //  thumbnail generation
        try {
            String thumbnailPath = videoProcessingUtils.getThumbnailPath(videoFile);
            String savedPath = videoProcessingUtils.generateThumbnail(videoFile.getStorageLocation(), thumbnailPath);
            videoFile.setThumbnailPath(savedPath);
            Thread.sleep(1000);
            notificationService.sendProgressUpdate(videoFile.getId(), "Thumbnail generation: creating thumbnails");
            Thread.sleep(1000);
            return "Thumbnail generation completed saved at: " + savedPath;
        } catch (Exception e) {
            throw new RuntimeException("Thumbnail generation failed: " + e.getMessage(), e);
        }
    }

    public void shutdown() {
        executorService.shutdown();
        try {
            if (!executorService.awaitTermination(60, TimeUnit.SECONDS)) {
                executorService.shutdownNow();
            }
        } catch (InterruptedException e) {
            executorService.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
}
