package com.example.back.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "action")
public class Action {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_action")
    private Integer idAction;

    @Column(name = "type_action")
    private String typeAction;

    @OneToMany(mappedBy = "action", cascade = CascadeType.ALL)
    private List<ActionHasFormation> formations;

    public Integer getIdAction() {
        return idAction;
    }

    public void setIdAction(Integer idAction) {
        this.idAction = idAction;
    }

    public String getTypeAction() {
        return typeAction;
    }

    public void setTypeAction(String typeAction) {
        this.typeAction = typeAction;
    }

    public List<ActionHasFormation> getFormations() {
        return formations;
    }

    public void setFormations(List<ActionHasFormation> formations) {
        this.formations = formations;
    }
}
