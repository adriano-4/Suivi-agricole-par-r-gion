package com.example.back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "appartenance")
public class Appartenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_appar")
    private Integer idAppartenance;

    @Column(name = "nom_appartenance")
    private String nomAppartenance;

    @ManyToOne
    @JoinColumn(name = "id_fok")
    private Fokontany fokontany;


    public Integer getIdAppartenance() { return idAppartenance; }
    public void setIdAppartenance(Integer idAppartenance) { this.idAppartenance = idAppartenance; }

    public String getNomAppartenance() { return nomAppartenance; }
    public void setNomAppartenance(String nomAppartenance) { this.nomAppartenance = nomAppartenance; }

    public Fokontany getFokontany() { return fokontany; }
    public void setFokontany(Fokontany fokontany) { this.fokontany = fokontany; }
}
