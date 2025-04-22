package com.cwc.vidforge.utils;

import com.cwc.vidforge.model.Metadata;
import com.cwc.vidforge.model.VideoFile;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;


@Configuration
public class VideoProcessingUtils {

    @Value("${thumbnail.location:thumbnails}")
    private String thumbnailLocation;

    public String getThumbnailPath(VideoFile videoFile) {
        return thumbnailLocation + videoFile.getVideoId() + ".jpg";
    }


    @PostConstruct
    public void createThumbnailDirectoryIfNotExists() {
        try {
            Path directory = Paths.get(thumbnailLocation);
            Files.createDirectories(directory);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize thumbnail location", e);
        }
    }

    public  Metadata extractMetadata(String videoPath) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(
                "ffprobe", "-v", "quiet", "-print_format", "json",
                "-show_format", "-show_streams", videoPath
        );

        Process process = pb.start();
        String output = new BufferedReader(new InputStreamReader(process.getInputStream()))
                .lines().collect(Collectors.joining("\n"));

        int exit = process.waitFor();
        if (exit != 0) throw new RuntimeException("ffprobe failed");

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(output);
        JsonNode formatNode = root.path("format");
        JsonNode videoStream = root.path("streams").findPath("codec_type").asText().equals("video")
                ? root.path("streams").get(0) : null;

        return new Metadata(
                formatNode.path("format_name").asText(),
                formatNode.path("duration").asText(),
                videoStream.path("codec_name").asText(),
                videoStream.path("width").asText() + "x" + videoStream.path("height").asText()
        );
    }

    public  String generateThumbnail(String videoPath, String outputPath) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(
                "ffmpeg", "-y", "-i", videoPath,
                "-ss", "00:00:02", "-vframes", "1", "-vf", "scale=320:180",
                outputPath
        );

        Process process = pb.start();
        int exit = process.waitFor();
        if (exit != 0) throw new RuntimeException("Thumbnail generation failed");

        return outputPath;
    }
}
