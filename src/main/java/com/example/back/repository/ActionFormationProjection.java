package com.example.back.repository;

import java.time.LocalDate;

public interface ActionFormationProjection {
    Integer getIdFormation();
    String getTypeAction();
    LocalDate getDateAction();
}
