package com.example.back.dto;

import java.time.LocalDate;

public class ActionUpdateRequest {
    private LocalDate dateAction;

    public LocalDate getDateAction() {
        return dateAction;
    }

    public void setDateAction(LocalDate dateAction) {
        this.dateAction = dateAction;
    }
}
