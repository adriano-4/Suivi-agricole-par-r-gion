package com.example.back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "superviseur")
public class Superviseur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sup")
    private Integer idSup;

    @Column(name = "nom_sup")
    private String nomSup;

    @Column(name = "prenom_sup")
    private String prenomSup;

    @Column(name = "contact_sup")
    private String contactSup;

    // Getters & Setters
    public Integer getIdSup() {
        return idSup;
    }

    public void setIdSup(Integer idSup) {
        this.idSup = idSup;
    }

    public String getNomSup() {
        return nomSup;
    }

    public void setNomSup(String nomSup) {
        this.nomSup = nomSup;
    }

    public String getPrenomSup() {
        return prenomSup;
    }

    public void setPrenomSup(String prenomSup) {
        this.prenomSup = prenomSup;
    }

    public String getContactSup() {
        return contactSup;
    }

    public void setContactSup(String contactSup) {
        this.contactSup = contactSup;
    }
}
