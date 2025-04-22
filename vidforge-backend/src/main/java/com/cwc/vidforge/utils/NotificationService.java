package com.cwc.vidforge.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendProgressUpdate(String videoId, String message) {
        messagingTemplate.convertAndSend("/topic/progress/" + videoId, message);
    }

    public void sendProcessingComplete(String videoId, String message) {
        messagingTemplate.convertAndSend("/topic/complete/" + videoId, message);
    }
}
