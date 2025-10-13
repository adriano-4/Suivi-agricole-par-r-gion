package com.example.back.dto;

public class ApportUpdateRequest {
    private String typeApport;
    private Double quantite;
    private Integer idUnite;

    public String getTypeApport() {
        return typeApport;
    }

    public void setTypeApport(String typeApport) {
        this.typeApport = typeApport;
    }

    public Double getQuantite() {
        return quantite;
    }

    public void setQuantite(Double quantite) {
        this.quantite = quantite;
    }

    public Integer getIdUnite() {
        return idUnite;
    }

    public void setIdUnite(Integer idUnite) {
        this.idUnite = idUnite;
    }
}
