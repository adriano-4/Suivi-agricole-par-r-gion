package com.example.back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "intrant")
public class Intrant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_intrant")
    private Integer idIntrant;

    @Column(name = "type_intrant", length = 100, nullable = false)
    private String typeIntrant;

    @ManyToOne
    @JoinColumn(name = "id_unite", nullable = false)
    private Unite unite;

    public Integer getIdIntrant() {
        return idIntrant;
    }

    public void setIdIntrant(Integer idIntrant) {
        this.idIntrant = idIntrant;
    }

    public String getTypeIntrant() {
        return typeIntrant;
    }

    public void setTypeIntrant(String typeIntrant) {
        this.typeIntrant = typeIntrant;
    }

    public Unite getUnite() {
        return unite;
    }

    public void setUnite(Unite unite) {
        this.unite = unite;
    }
}
