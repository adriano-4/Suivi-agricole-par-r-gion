package com.example.back.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "vulgarisation")
public class Vulgarisation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vulg")
    private Integer idVulgarisation;

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

    // Getters & Setters
    public Integer getIdVulgarisation() {
        return idVulgarisation;
    }

    public void setIdVulgarisation(Integer idVulgarisation) {
        this.idVulgarisation = idVulgarisation;
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

    public void setNbrPf(BigDecimal nbrPf) {
        this.nbrPf = nbrPf;
    }

    public BigDecimal getNbrPfCep() {
        return nbrPfCep;
    }

    public void setNbrPfCep(BigDecimal nbrPfCep) {
        this.nbrPfCep = nbrPfCep;
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
}
