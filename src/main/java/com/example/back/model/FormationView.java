package com.example.back.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "v_formation")
public class FormationView {

    @Id
    @Column(name = "id_formation")
    private Integer idFormation;

    @Column(name = "date_formation")
    private LocalDateTime dateFormation;

    private String remarque;

    @Column(name = "id_vulg")
    private Integer idVulg;

    @Column(name = "nbr_eaf_encadre")
    private BigDecimal nbrEafEncadre;

    @Column(name = "nbr_pf")
    private BigDecimal nbrPf;

    @Column(name = "nbr_pf_cep")
    private BigDecimal nbrPfCep;

    @Column(name = "superficie_cible")
    private BigDecimal superficieCible;

    @Column(name = "outil_formation_pf")
    private BigDecimal outilFormationPf;

    @Column(name = "plaque_identification_pf")
    private BigDecimal plaqueIdentificationPf;

    @Column(name = "fiche_bpa_sra_composte")
    private BigDecimal ficheBpaSraComposte;

    @Column(name = "fiche_bp_post_recolte")
    private BigDecimal ficheBpPostRecolte;

    @Column(name = "id_tech")
    private Integer idTech;

    @Column(name = "nom_tech")
    private String nomTech;

    @Column(name = "prenom_tech")
    private String prenomTech;

    @Column(name = "contact_tech")
    private String contactTech;

    @Column(name = "id_sup")
    private Integer idSup;

    @Column(name = "nom_sup")
    private String nomSup;

    @Column(name = "prenom_sup")
    private String prenomSup;

    @Column(name = "contact_sup")
    private String contactSup;

    @Column(name = "nom_appartenance")
    private String nomAppartenance;

    @Column(name = "nom_fok")
    private String nomFok;

    @Column(name = "nom_comm")
    private String nomComm;

    @Column(name = "nom_dist")
    private String nomDist;

    @Column(name = "nom_reg")
    private String nomReg;

    // --- Getters & Setters ---

    public Integer getIdFormation() {
        return idFormation;
    }

    public void setIdFormation(Integer idFormation) {
        this.idFormation = idFormation;
    }

    public LocalDateTime getDateFormation() {
        return dateFormation;
    }

    public void setDateFormation(LocalDateTime dateFormation) {
        this.dateFormation = dateFormation;
    }

    public String getRemarque() {
        return remarque;
    }

    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

    public Integer getIdVulg() {
        return idVulg;
    }

    public void setIdVulg(Integer idVulg) {
        this.idVulg = idVulg;
    }

    public BigDecimal getNbrEafEncadre() {
        return nbrEafEncadre;
    }

    public void setNbrEafEncadre(BigDecimal nbrEafEncadre) {
        this.nbrEafEncadre = nbrEafEncadre;
    }

    public BigDecimal getNbrPf() {
        return nbrPf;
    }
    public BigDecimal getNbrPfCep(){
        return nbrPfCep;
    }

    public void setNbrPf(BigDecimal nbrPf) {
        this.nbrPf = nbrPf;
    }

    public BigDecimal getSuperficieCible() {
        return superficieCible;
    }

    public void setSuperficieCible(BigDecimal superficieCible) {
        this.superficieCible = superficieCible;
    }

    public BigDecimal getOutilFormationPf() {
        return outilFormationPf;
    }

    public void setOutilFormationPf(BigDecimal outilFormationPf) {
        this.outilFormationPf = outilFormationPf;
    }

    public BigDecimal getPlaqueIdentificationPf() {
        return plaqueIdentificationPf;
    }

    public void setPlaqueIdentificationPf(BigDecimal plaqueIdentificationPf) {
        this.plaqueIdentificationPf = plaqueIdentificationPf;
    }

    public BigDecimal getFicheBpaSraComposte() {
        return ficheBpaSraComposte;
    }

    public void setFicheBpaSraComposte(BigDecimal ficheBpaSraComposte) {
        this.ficheBpaSraComposte = ficheBpaSraComposte;
    }

    public BigDecimal getFicheBpPostRecolte() {
        return ficheBpPostRecolte;
    }

    public void setFicheBpPostRecolte(BigDecimal ficheBpPostRecolte) {
        this.ficheBpPostRecolte = ficheBpPostRecolte;
    }

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

    public String getNomAppartenance() {
        return nomAppartenance;
    }

    public void setNomAppartenance(String nomAppartenance) {
        this.nomAppartenance = nomAppartenance;
    }

    public String getNomFok() {
        return nomFok;
    }

    public void setNomFok(String nomFok) {
        this.nomFok = nomFok;
    }

    public String getNomComm() {
        return nomComm;
    }

    public void setNomComm(String nomComm) {
        this.nomComm = nomComm;
    }

    public String getNomDist() {
        return nomDist;
    }

    public void setNomDist(String nomDist) {
        this.nomDist = nomDist;
    }


    public String getNomReg() {
        return nomReg;
    }

    public void setNomReg(String nomReg) {
        this.nomReg = nomReg;
    }
}
