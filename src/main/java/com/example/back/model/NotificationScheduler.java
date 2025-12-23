package com.example.back.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@EnableScheduling
@Component
public class NotificationScheduler {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Scheduled(cron = "0 0 0 * * ?")
    public void generateNotifications() {
        jdbcTemplate.execute("SELECT add_notification_today_actions()");
    }
}
