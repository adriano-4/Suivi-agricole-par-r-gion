package com.example.back.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "v_action_etat")
public class ActionEtatView {

    @Id
    @Column(name = "id_action_etat")
    private Long id_action_etat;

    private String region;

    private String action;

    @Column(name = "date_action")
    private LocalDate dateAction;

    private Integer etat;


    public Long getId_action_etat() {
        return id_action_etat;
    }

    public String getRegion() {
        return region;
    }

    public String getAction() {
        return action;
    }

    public LocalDate getDateAction() {
        return dateAction;
    }

    public Integer getEtat() {
        return etat;
    }


    public void setId_action_etat(Long id_action_etat) {
        this.id_action_etat = id_action_etat;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setDateAction(LocalDate dateAction) {
        this.dateAction = dateAction;
    }

    public void setEtat(Integer etat) {
        this.etat = etat;
    }
}
