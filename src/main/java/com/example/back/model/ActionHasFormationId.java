package com.example.back.model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ActionHasFormationId implements Serializable {

    private Integer idAction;
    private Integer idFormation;

    // Constructors
    public ActionHasFormationId() {}

    public ActionHasFormationId(Integer idAction, Integer idFormation) {
        this.idAction = idAction;
        this.idFormation = idFormation;
    }

    // Getters & Setters
    public Integer getIdAction() {
        return idAction;
    }

    public void setIdAction(Integer idAction) {
        this.idAction = idAction;
    }

    public Integer getIdFormation() {
        return idFormation;
    }

    public void setIdFormation(Integer idFormation) {
        this.idFormation = idFormation;
    }

    // equals() and hashCode()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ActionHasFormationId)) return false;
        ActionHasFormationId that = (ActionHasFormationId) o;
        return Objects.equals(idAction, that.idAction) &&
                Objects.equals(idFormation, that.idFormation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idAction, idFormation);
    }
}
