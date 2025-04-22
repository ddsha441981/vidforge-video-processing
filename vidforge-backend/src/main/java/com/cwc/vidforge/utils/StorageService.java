package com.cwc.vidforge.utils;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class StorageService {

    @Value("${storage.location:uploads}")
    private String storageLocation;

    @PostConstruct
    public void init() {
        try {
            Path directory = Paths.get(storageLocation);
            Files.createDirectories(directory);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage location", e);
        }
    }

    public String store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store empty file");
            }

            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path destinationFile = Paths.get(storageLocation).resolve(filename).normalize();

            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);
            return destinationFile.toString();

        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }
}
