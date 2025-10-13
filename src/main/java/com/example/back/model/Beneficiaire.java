package com.example.back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "beneficiaire")
public class Beneficiaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_benef")
    private Integer id;

    @Column(name = "cin", nullable = false, unique = true, length = 20)
    private String cin;

    @Column(name = "nom_benef", nullable = false, length = 255)
    private String nom;

    @Column(name = "prenom_benef", nullable = false, length = 255)
    private String prenom;

    @Column(name = "surnom_benef", length = 20)
    private String surnom;

    @Column(name = "genre", length = 20)
    private String genre;

    @ManyToOne
    @JoinColumn(name = "id_appar", referencedColumnName = "id_appar")
    private Appartenance appartenance;


    @Column(name = "datnais")
    private java.time.LocalDateTime dateNaissance;

    @Column(name = "lieunais", length = 255)
    private String lieuNaissance;

    @Column(name = "situation_mat", length = 20)
    private String situationMatrimoniale;

    @Column(name = "nom_conjoint", length = 20)
    private String nomConjoint;

    @Column(name = "contact", length = 10)
    private String contact;

    @Column(name = "remarque_sup", length = 255)
    private String remarqueSup;

    // --- GETTERS & SETTERS ---

    public Appartenance getAppartenance() {
        return appartenance;
    }

    public void setAppartenance(Appartenance appartenance) {
        this.appartenance = appartenance;
    }

    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public String getCin() { return cin; }
    public void setCin(String cin) { this.cin = cin; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getSurnom() { return surnom; }
    public void setSurnom(String surnom) { this.surnom = surnom; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public java.time.LocalDateTime getDateNaissance() { return dateNaissance; }
    public void setDateNaissance(java.time.LocalDateTime dateNaissance) { this.dateNaissance = dateNaissance; }

    public String getLieuNaissance() { return lieuNaissance; }
    public void setLieuNaissance(String lieuNaissance) { this.lieuNaissance = lieuNaissance; }

    public String getSituationMatrimoniale() { return situationMatrimoniale; }
    public void setSituationMatrimoniale(String situationMatrimoniale) { this.situationMatrimoniale = situationMatrimoniale; }

    public String getNomConjoint() { return nomConjoint; }
    public void setNomConjoint(String nomConjoint) { this.nomConjoint = nomConjoint; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getRemarqueSup() { return remarqueSup; }
    public void setRemarqueSup(String remarqueSup) { this.remarqueSup = remarqueSup; }
}
