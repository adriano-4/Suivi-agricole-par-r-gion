package com.example.back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.math.BigInteger;

@Entity
@Table(name = "v_int_dist")
public class BeneficiaireIntrantView {

    @Id
    private Long id_ben_int;

    private Integer id_benef;
    private String region;
    private String intrant;
    private BigDecimal quantite;
    private String unite;

    public  Long getId_ben_int(){
        return id_ben_int;
    }

    public void setId_ben_int(Long id_ben_int) {
        this.id_ben_int = id_ben_int;
    }

    public Integer getId_benef() {
        return id_benef;
    }

    public void setId_benef(Integer id_benef) {
        this.id_benef = id_benef;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getIntrant() {
        return intrant;
    }

    public void setIntrant(String intrant) {
        this.intrant = intrant;
    }

    public BigDecimal getQuantite() {
        return quantite;
    }

    public void setQuantite(BigDecimal quantite) {
        this.quantite = quantite;
    }

    public String getUnite() {
        return unite;
    }

    public void setUnite(String unite) {
        this.unite = unite;
    }
}
