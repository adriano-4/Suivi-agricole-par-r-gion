package com.example.back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "technicien")
public class Technicien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tech")
    private Integer idTech;

    @Column(name = "nom_tech")
    private String nomTech;

    @Column(name = "prenom_tech")
    private String prenomTech;

    @Column(name = "contact_tech")
    private String contactTech;

    // Getters & Setters
    public Integer getIdTech() {
        return idTech;
    }

    public void setIdTech(Integer idTech) {
        this.idTech = idTech;
    }

    public String getNomTech() {
        return nomTech;
    }

    public void setNomTech(String nomTech) {
        this.nomTech = nomTech;
    }

    public String getPrenomTech() {
        return prenomTech;
    }

    public void setPrenomTech(String prenomTech) {
        this.prenomTech = prenomTech;
    }

    public String getContactTech() {
        return contactTech;
    }

    public void setContactTech(String contactTech) {
        this.contactTech = contactTech;
    }
}
