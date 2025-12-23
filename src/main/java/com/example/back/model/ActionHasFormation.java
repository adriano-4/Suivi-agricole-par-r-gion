package com.example.back.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "action_has_formation")
public class ActionHasFormation {

    @EmbeddedId
    private ActionHasFormationId id;

    @ManyToOne
    @MapsId("idAction")
    @JoinColumn(name = "id_action")
    private Action action;

    @ManyToOne
    @MapsId("idFormation")
    @JoinColumn(name = "id_formation")
    private Formation formation;

    @Column(name = "date_action")
    private LocalDate dateAction;

    @Column(name = "etat")
    private Integer etat;

    // Getters & Setters
    public ActionHasFormationId getId() {
        return id;
    }

    public void setId(ActionHasFormationId id) {
        this.id = id;
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public Formation getFormation() {
        return formation;
    }

    public void setFormation(Formation formation) {
        this.formation = formation;
    }

    public LocalDate  getDateAction() {
        return dateAction;
    }

    public void setDateAction(LocalDate  dateAction) {
        this.dateAction = dateAction;
    }
    public Integer getEtat(){
        return etat;
    }
    public void setEtat(Integer etat){
        this.etat = etat;
    }
}
