package com.example.back.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "v_beneficiaire")
public class BeneficiaireView {

    @Id
    @Column(name = "id_benef")
    private Integer idBenef;

    private String cin;
    private String nomBenef;
    private String prenomBenef;
    private String surnomBenef;
    private String genre;

    @Column(name = "datnais")
    private LocalDateTime datnais;

    private String lieunais;
    private String situationMat;
    private String nomConjoint;
    private String contact;
    private String remarqueSup;
    private String nomAppartenance;
    //private String nomAue;
    private String nomFok;
    private String nomComm;
    private String nomDist;
    private String nomReg;

    @Column(name = "date_mise")
    private LocalDateTime dateMise;

    @Column(name = "sup_tot_prec", columnDefinition = "NUMERIC")
    private BigDecimal supTotPrec;

    @Column(name = "rendement_prec", columnDefinition = "NUMERIC")
    private BigDecimal rendementPrec;

    private String varieteRiz;

    @Column(name = "sup_tot_actuelle", columnDefinition = "NUMERIC")
    private BigDecimal supTotActuelle;

    @Column(name = "sup_fsrp_actuelle", columnDefinition = "NUMERIC")
    private BigDecimal supFSRPActuelle;

    private String typeApport;

    @Column(name = "quantite")
    private BigDecimal quantite;


    // --- Getters & Setters ---

    public Integer getIdBenef() {
        return idBenef;
    }

    public void setIdBenef(Integer idBenef) {
        this.idBenef = idBenef;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getNomBenef() {
        return nomBenef;
    }

    public void setNomBenef(String nomBenef) {
        this.nomBenef = nomBenef;
    }

    public String getPrenomBenef() {
        return prenomBenef;
    }

    public void setPrenomBenef(String prenomBenef) {
        this.prenomBenef = prenomBenef;
    }

    public String getSurnomBenef() {
        return surnomBenef;
    }

    public void setSurnomBenef(String surnomBenef) {
        this.surnomBenef = surnomBenef;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public LocalDateTime getDatnais() {
        return datnais;
    }

    public void setDatnais(LocalDateTime datnais) {
        this.datnais = datnais;
    }

    public String getLieunais() {
        return lieunais;
    }

    public void setLieunais(String lieunais) {
        this.lieunais = lieunais;
    }

    public String getSituationMat() {
        return situationMat;
    }

    public void setSituationMat(String situationMat) {
        this.situationMat = situationMat;
    }

    public String getNomConjoint() {
        return nomConjoint;
    }

    public void setNomConjoint(String nomConjoint) {
        this.nomConjoint = nomConjoint;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getRemarqueSup() {
        return remarqueSup;
    }

    public void setRemarqueSup(String remarqueSup) {
        this.remarqueSup = remarqueSup;
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

    public LocalDateTime getDateMise() {
        return dateMise;
    }

    public void setDateMise(LocalDateTime dateMise) {
        this.dateMise = dateMise;
    }

    public BigDecimal getSupTotPrec() {
        return supTotPrec;
    }

    public void setSupTotPrec(BigDecimal supTotPrec) {
        this.supTotPrec = supTotPrec;
    }

    public BigDecimal getRendementPrec() {
        return rendementPrec;
    }

    public void setRendementPrec(BigDecimal rendementPrec) {
        this.rendementPrec = rendementPrec;
    }

    public String getVarieteRiz() {
        return varieteRiz;
    }

    public void setVarieteRiz(String varieteRiz) {
        this.varieteRiz = varieteRiz;
    }

    public BigDecimal getSupTotActuelle() {
        return supTotActuelle;
    }

    public void setSupTotActuelle(BigDecimal supTotActuelle) {
        this.supTotActuelle = supTotActuelle;
    }

    public BigDecimal getSupFSRPActuelle() {
        return supFSRPActuelle;
    }

    public void setSupFSRPActuelle(BigDecimal supFSRPActuelle) {
        this.supFSRPActuelle = supFSRPActuelle;
    }

    public String getTypeApport() {
        return typeApport;
    }

    public void setTypeApport(String typeApport) {
        this.typeApport = typeApport;
    }

    public BigDecimal getQuantite() {
        return quantite;
    }

    public void setQuantite(BigDecimal quantite) {
        this.quantite = quantite;
    }
}
