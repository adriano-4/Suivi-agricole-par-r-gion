package com.example.back.dto;

import java.time.LocalDate;

public class ActionUpdateRequest {
    private LocalDate dateAction;
    private Integer etat;

    public LocalDate getDateAction() {
        return dateAction;
    }
    public Integer getEtat() {
        return etat;
    }

    public void setDateAction(LocalDate dateAction) {
        this.dateAction = dateAction;
    }

    public void setEtat(Integer etat) {
        this.etat = etat;
    }
}
