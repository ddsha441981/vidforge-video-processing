package com.cwc.vidforge.controller;

import com.cwc.vidforge.enums.Status;
import com.cwc.vidforge.model.VideoFile;
import com.cwc.vidforge.repository.VideoFileRepository;
import com.cwc.vidforge.services.ProcessingService;
import com.cwc.vidforge.utils.StorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/videos")
public class UploadController {

    private final StorageService storageService;

    private final VideoFileRepository videoFileRepository;

    private final ProcessingService processingService;

    public UploadController(StorageService storageService, VideoFileRepository videoFileRepository, ProcessingService processingService) {
        this.storageService = storageService;
        this.videoFileRepository = videoFileRepository;
        this.processingService = processingService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadVideo(@RequestParam("file") MultipartFile file) {
        try {
            // Store the file in local folder
            String storageLocation = storageService.store(file);

            // Save metadata in  database
            VideoFile videoFile = new VideoFile();
            videoFile.setOriginalFilename(file.getOriginalFilename());
            videoFile.setStorageLocation(storageLocation);
            videoFile.setStatus(Status.UPLOADED);
            videoFile.setUploadTime(LocalDateTime.now());
            videoFileRepository.save(videoFile);

            // Trigger async processing
            processingService.processVideo(videoFile);

            Map<String, Object> response = new HashMap<>();
            response.put("fileId", videoFile.getId());
            response.put("status", "uploaded");
            response.put("message", "File uploaded and processing started");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", e.getMessage());

            return ResponseEntity.badRequest().body(response);
        }
    }
}