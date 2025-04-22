package com.cwc.vidforge.model;

import com.cwc.vidforge.enums.Status;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "video_files")
public class VideoFile implements Serializable {
    @Id
    private String id;
    @Indexed(unique = true)
    private String videoId = UUID.randomUUID().toString();
    private String originalFilename;
    private String storageLocation;
    private Status status;
    private LocalDateTime uploadTime;
    private LocalDateTime processedTime;
    private String processingDetails;

    private String format;
    private String duration;
    private String codec;
    private String resolution;
    private String thumbnailPath;


    @Override
    public int hashCode() {
        return Objects.hash(videoId, originalFilename, storageLocation, status, uploadTime, processedTime, processingDetails);
    }

    @Override
    public boolean equals(Object obj) {
       if (this == obj){
           return true;
       }
       if (!(obj instanceof VideoFile)){
           return false;
       }
       VideoFile other = (VideoFile) obj;
       return Objects.equals(videoId, other.videoId) && Objects.equals(originalFilename, other.originalFilename);
    }
}
