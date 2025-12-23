package com.example.back.dto;

import java.math.BigDecimal;

public class UpdateQuantiteDTO {
    private BigDecimal quantite;

    public BigDecimal getQuantite() {
        return quantite;
    }

    public void setQuantite(BigDecimal quantite) {
        this.quantite = quantite;
    }
}
