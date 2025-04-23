package com.cwc.vidforge.model;

import com.cwc.vidforge.enums.Status;
import com.cwc.vidforge.utils.ThumbnailUtils;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    @Transient
    public String getThumbnailUrl() {
        return ThumbnailUtils.resolvePublicThumbnailUrl(this.thumbnailPath);
    }

    @Transient
    @JsonProperty("formattedDuration")
    public String getFormattedDuration() {
        try {
            double durationInSeconds = Double.parseDouble(this.duration);
            long totalSeconds = (long) durationInSeconds;

            long hours = totalSeconds / 3600;
            long minutes = (totalSeconds % 3600) / 60;
            long seconds = totalSeconds % 60;

            StringBuilder formatted = new StringBuilder();
            if (hours > 0) formatted.append(hours).append("h ");
            if (minutes > 0) formatted.append(minutes).append("m ");
            formatted.append(seconds).append("s");

            return formatted.toString();
        } catch (Exception e) {
            return "Invalid duration";
        }
    }

    @Transient
    @JsonProperty("formattedUploadTime")
    public String getFormattedUploadTime() {
        return formatDateTime(uploadTime);
    }

    @Transient
    @JsonProperty("formattedProcessedTime")
    public String getFormattedProcessedTime() {
        return formatDateTime(processedTime);
    }

    private String formatDateTime(LocalDateTime dateTime) {
        if (dateTime == null) return "";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");
        return dateTime.format(formatter);
    }



}
