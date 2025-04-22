package com.cwc.vidforge.utils;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class ThumbnailUtils {
    public static String resolvePublicThumbnailUrl(String thumbnailPath) {
        if (thumbnailPath != null && thumbnailPath.contains("thumbnails")) {
            String filename = thumbnailPath.substring(thumbnailPath.lastIndexOf("/") + 1);
            String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .build()
                    .toUriString();
            return baseUrl + "/thumbnails/" + filename;
        }
        return null;
    }
}
