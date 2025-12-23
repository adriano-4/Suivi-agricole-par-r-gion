package com.example.back.controller;

import com.example.back.model.Notification;
import com.example.back.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<Notification> getAll() {
        return notificationService.getAllNotifications();
    }
    @PutMapping("/{id}/read")
    public Notification markAsRead(@PathVariable Integer id) {
        return notificationService.markNotificationAsRead(id);
    }
}
