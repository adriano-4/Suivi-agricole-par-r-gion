package com.example.back.dto;

public class ApportResponse {
    private Integer id;
    private String typeApport;
    private Double quantite;
    private String uniteMesure;
    private Integer idUnite;

    // getters et setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTypeApport() { return typeApport; }
    public void setTypeApport(String typeApport) { this.typeApport = typeApport; }

    public Double getQuantite() { return quantite; }
    public void setQuantite(Double quantite) { this.quantite = quantite; }

    public String getUniteMesure() { return uniteMesure; }
    public void setUniteMesure(String uniteMesure) { this.uniteMesure = uniteMesure; }

    public Integer getIdUnite() { return idUnite; }
    public void setIdUnite(Integer idUnite) { this.idUnite = idUnite; }
}
