package com.cwc.vidforge.controller;

import com.cwc.vidforge.enums.Status;
import com.cwc.vidforge.model.VideoFile;
import com.cwc.vidforge.services.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/videos")
    public ResponseEntity<List<VideoFile>> getAllVideos() {
        return ResponseEntity.ok(adminService.getAllVideosList());
    }

    @GetMapping("/videos/status/{status}")
    public ResponseEntity<?> getVideosByStatus(@PathVariable String status) {
        try {
            Status statusEnum = Status.valueOf(status.toUpperCase());
            return ResponseEntity.ok(adminService.getVideosByStatus(statusEnum));
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid status value: " + status);
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/videos/{videoId}")
    public ResponseEntity<?> getVideoById(@PathVariable String videoId) {
        try {
            VideoFile videoFile = adminService.getVideoByVideoId(videoId);
            return ResponseEntity.ok(videoFile);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(404).body(error);
        }
    }

    @DeleteMapping("/videos/{videoId}")
    public ResponseEntity<?> deleteVideo(@PathVariable String videoId) {
        try {
            adminService.deleteVideoByVideoId(videoId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Video deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Failed to delete video: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/paginated")
    public Page<VideoFile> getPaginated(@RequestParam int page, @RequestParam int size) {
        return adminService.getPaginatedVideos(page, size);
    }

    @GetMapping("/paginated/status")
    public Page<VideoFile> getPaginatedByStatus(@RequestParam Status status, @RequestParam int page, @RequestParam int size) {
        return adminService.getPaginatedVideosByStatus(status, page, size);
    }

}
