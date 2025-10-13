package com.example.back.model;

import jakarta.persistence.*;

import java.awt.font.NumericShaper;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Date;

@Entity
@Table(name = "suiviregion")
public class Suiviregion {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_suivi")
    private Integer id;

    @Column(name = "annee_suivi")
    private java.time.LocalDateTime annee_suivi;

    @Column(name = "nbr_beneficiaire")
    private Integer nbr_beneficiaire;

    @Column(name = "superficie_totale")
    private BigDecimal superficie_totale;

    @Column(name = "production_totale")
    private BigDecimal production_totale;


    @Column(name = "rendement_moyen")
    private BigDecimal rendement_moyen;

    @Column(name = "nbr_formation")
    private Integer nbr_formation;

    @Column(name = "nbr_action")
    private Integer nbr_action;

    @Column(name = "nbr_livraison")
    private Integer nbr_livraison;


    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}

    public java.time.LocalDateTime getAnnee_suivi() { return annee_suivi; }
    public void setAnnee_suivi(java.time.LocalDateTime annee_suivi) { this.annee_suivi = annee_suivi; }

    public Integer getNbr_beneficiaire() {return nbr_beneficiaire;}
    public void setNbr_beneficiaire(Integer nbr_beneficiaire) {this.nbr_beneficiaire = nbr_beneficiaire;}

    public BigDecimal getSuperficie_totale() {return superficie_totale;}
    public void setSuperficie_totale(BigDecimal superficie_totale) {this.superficie_totale = superficie_totale;}

    public BigDecimal getProduction_totale() {return production_totale;}
    public void setProduction_totale(BigDecimal production_totale) {this.production_totale = production_totale;}

    public BigDecimal getRendement_moyen() {return rendement_moyen;}
    public void setRendement_moyen(BigDecimal rendement_moyen) {this.rendement_moyen = rendement_moyen;}

    public Integer getNbr_formation() {return nbr_formation;}
    public void setNbr_formation(Integer nbr_formation) {this.nbr_formation = nbr_formation;}

    public Integer getNbr_action() {return nbr_action;}
    public void setNbr_action(Integer nbr_action) {this.nbr_action = nbr_action;}

    public Integer getNbr_livraison() {return nbr_livraison;}
    public void setNbr_livraison(Integer nbr_livraison) {this.nbr_livraison = nbr_livraison;}

}
