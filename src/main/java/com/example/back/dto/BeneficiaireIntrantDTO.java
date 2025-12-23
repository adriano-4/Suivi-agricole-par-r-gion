package com.example.back.dto;

import java.math.BigDecimal;

public class BeneficiaireIntrantDTO {

    private Integer idIntrant;
    private String typeIntrant;
    private BigDecimal quantite;
    private String unite;

    public BeneficiaireIntrantDTO(
            Integer idIntrant,
            String typeIntrant,
            BigDecimal quantite,
            String unite) {
        this.idIntrant = idIntrant;
        this.typeIntrant = typeIntrant;
        this.quantite = quantite;
        this.unite = unite;
    }

    public Integer getIdIntrant() {
        return idIntrant;
    }

    public String getTypeIntrant() {
        return typeIntrant;
    }

    public BigDecimal getQuantite() {
        return quantite;
    }

    public String getUnite() {
        return unite;
    }
}

