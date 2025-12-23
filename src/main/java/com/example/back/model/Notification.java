package com.example.back.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idNotification;

    private String objet;
    private String region;
    private String action;

    @Column(name = "date_notif")
    private LocalDateTime dateNotif;

    private Integer etat; // 0 = non lu, 1 = lu

    public Integer getIdNotification() {
        return idNotification;
    }

    public String getObjet() {
        return objet;
    }

    public String getRegion() {
        return region;
    }

    public String getAction() {
        return action;
    }

    public LocalDateTime getDateNotif() {
        return dateNotif;
    }

    public Integer getEtat() {
        return etat;
    }

    public void setIdNotification(Integer idNotification) {
        this.idNotification = idNotification;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setDateNotif(LocalDateTime dateNotif) {
        this.dateNotif = dateNotif;
    }

    public void setEtat(Integer etat) {
        this.etat = etat;
    }
}
