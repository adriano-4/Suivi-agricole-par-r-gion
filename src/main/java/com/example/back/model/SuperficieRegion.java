package com.example.back.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "v_sup")
public class SuperficieRegion {

    @Id
    @Column(name = "region")
    private String region;

    @Column(name = "superficie_totale_cible")
    private BigDecimal superficieTotaleCible;

    // Getters et Setters
    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public BigDecimal getSuperficieTotaleCible() {
        return superficieTotaleCible;
    }

    public void setSuperficieTotaleCible(BigDecimal superficieTotaleCible) {
        this.superficieTotaleCible = superficieTotaleCible;
    }
}
