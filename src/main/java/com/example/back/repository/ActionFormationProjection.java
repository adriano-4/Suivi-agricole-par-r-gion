package com.example.back.repository;

import java.time.LocalDate;

public interface ActionFormationProjection {
    Integer getIdAction();
    Integer getIdFormation();
    String getTypeAction();
    LocalDate getDateAction();
    Integer getEtat();
}
