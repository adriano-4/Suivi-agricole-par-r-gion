package com.example.back.service;

import com.example.back.model.Notification;
import com.example.back.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification markNotificationAsRead(Integer id) {
        Notification notif = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification non trouvée avec id " + id));
        notif.setEtat(1); // marquer comme lu
        return notificationRepository.save(notif);
    }
}
