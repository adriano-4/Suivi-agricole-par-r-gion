package com.example.back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "responsablemagasin")
public class ResponsableMagasin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_resp")
    private Integer idResp;

    @Column(name = "nom_resp")
    private String nomResp;

    @Column(name = "prenom_resp")
    private String prenomResp;

    @Column(name = "contact_resp")
    private String contactResp;

    // Getters & Setters
    public Integer getIdResp() {
        return idResp;
    }

    public void setIdResp(Integer idResp) {
        this.idResp = idResp;
    }

    public String getNomResp() {
        return nomResp;
    }

    public void setNomResp(String nomResp) {
        this.nomResp = nomResp;
    }

    public String getPrenomResp() {
        return prenomResp;
    }

    public void setPrenomResp(String prenomResp) {
        this.prenomResp = prenomResp;
    }

    public String getContactResp() {
        return contactResp;
    }

    public void setContactResp(String contactResp) {
        this.contactResp = contactResp;
    }
}
