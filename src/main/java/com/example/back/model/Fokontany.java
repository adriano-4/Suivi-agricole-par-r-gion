package com.example.back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fokontany")
public class Fokontany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_fok;

    @Column(nullable = false)
    private String nom_fok;

    @ManyToOne
    @JoinColumn(name = "id_comm")
    private Commune commune;

    // --- Getters & Setters ---
    public Integer getIdFok() {
        return id_fok;
    }

    public void setIdFok(Integer idFok) {
        this.id_fok = idFok;
    }

    public String getNomFok() {
        return nom_fok;
    }

    public void setNomFok(String nomFok) {
        this.nom_fok = nomFok;
    }

    public Commune getCommune() {
        return commune;
    }

    public void setCommune(Commune commune) {
        this.commune = commune;
    }
}
