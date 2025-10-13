package com.example.back.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class FormationCreateRequest {
    @JsonProperty("idAppartenance")
    private Integer idAppartenance;
    @JsonProperty("idSup")
    private Integer idSuperviseur;
    @JsonProperty("idTech")
    private Integer idTechnicien;
    private LocalDateTime dateFormation;
    private String remarque;

    // + getters / setters

    public Integer getIdAppartenance() {
        return idAppartenance;
    }
    public void setIdAppartenance(Integer idAppartenance) {
        this.idAppartenance = idAppartenance;
    }
    public Integer getIdSuperviseur() {
        return idSuperviseur;
    }
    public void setIdSuperviseur(Integer idSuperviseur) {
        this.idSuperviseur = idSuperviseur;
    }
    public Integer getIdTechnicien() {
        return idTechnicien;
    }
    public void setIdTechnicien(Integer idTechnicien) {
        this.idTechnicien = idTechnicien;
    }
    public LocalDateTime getDateFormation() {
        return dateFormation;
    }
    public void setDateFormation(LocalDateTime dateFormation) {
        this.dateFormation = dateFormation;
    }
    public String getRemarque() {
        return remarque;
    }
    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }
}
