package com.example.back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "v_stat")
public class StatView {

    @Id
    private String region;

    private Long  nbr_beneficiaire;
    private Long  nbr_formation;
    private BigDecimal  superficie_precedente;
    private BigDecimal  superficie_actuelle;
    private BigDecimal  superficie_fsrp_actuelle;

    // Getters et Setters
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public Long  getNbr_beneficiaire() { return nbr_beneficiaire; }
    public void setNbr_beneficiaire(Long  nbr_beneficiaire) { this.nbr_beneficiaire = nbr_beneficiaire; }

    public Long  getNbr_formation() { return nbr_formation; }
    public void setNbr_formation(Long  nbr_formation) { this.nbr_formation = nbr_formation; }

    public BigDecimal getSuperficie_precedente() { return superficie_precedente; }
    public void setSuperficie_precedente(BigDecimal  superficie_precedente) { this.superficie_precedente = superficie_precedente; }

    public BigDecimal  getSuperficie_actuelle() { return superficie_actuelle; }
    public void setSuperficie_actuelle(BigDecimal  superficie_actuelle) { this.superficie_actuelle = superficie_actuelle; }

    public BigDecimal  getSuperficie_fsrp_actuelle() { return superficie_fsrp_actuelle; }
    public void setSuperficie_fsrp_actuelle(BigDecimal  superficie_fsrp_actuelle) { this.superficie_fsrp_actuelle = superficie_fsrp_actuelle; }
}
