package com.example.back.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "formation")
public class Formation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_formation")
    private Integer idFormation;

    @ManyToOne
    @JoinColumn(name = "id_vulg", referencedColumnName = "id_vulg")
    private Vulgarisation vulgarisation;

    @ManyToOne
    @JoinColumn(name = "id_tech", referencedColumnName = "id_tech")
    private Technicien technicien;

    @ManyToOne
    @JoinColumn(name = "id_sup", referencedColumnName = "id_sup")
    private Superviseur superviseur;

    @ManyToOne
    @JoinColumn(name = "id_appar", referencedColumnName = "id_appar")
    private Appartenance appartenance;

    @Column(name = "date_formation")
    private LocalDateTime dateFormation;

    @Column(name = "remarque")
    private String remarque;

    // Getters & Setters
    public Integer getIdFormation() {
        return idFormation;
    }

    public void setIdFormation(Integer idFormation) {
        this.idFormation = idFormation;
    }

    public Vulgarisation getVulgarisation() {
        return vulgarisation;
    }

    public void setVulgarisation(Vulgarisation vulgarisation) {
        this.vulgarisation = vulgarisation;
    }

    public Technicien getTechnicien() {
        return technicien;
    }

    public void setTechnicien(Technicien technicien) {
        this.technicien = technicien;
    }

    public Superviseur getSuperviseur() {
        return superviseur;
    }

    public void setSuperviseur(Superviseur superviseur) {
        this.superviseur = superviseur;
    }

    public Appartenance getAppartenance() {
        return appartenance;
    }

    public void setAppartenance(Appartenance appartenance) {
        this.appartenance = appartenance;
    }

    public LocalDateTime  getDateFormation() {
        return dateFormation;
    }

    public void setDateFormation(LocalDateTime  dateFormation) {
        this.dateFormation = dateFormation;
    }

    public String getRemarque() {
        return remarque;
    }

    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

//    j ai envie que lorsque j ajoute une nouvelle formation l utilisateur fournie l appartenance , le superviseur responsable et le technicien et ca ajoute dans la table vulgarisateur avec des donnee vides pour tous les info dans vulgarisateur appart l id_vulg et
}
