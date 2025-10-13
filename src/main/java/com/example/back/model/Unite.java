package com.example.back.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "unite")
public class Unite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unite")
    private Integer idUnite;

    @Column(name = "unite_mesure", length = 50)
    private String uniteMesure;

    public Integer getIdUnite() { return idUnite; }
    public void setIdUnite(Integer idUnite) { this.idUnite = idUnite; }

    public String getUniteMesure() { return uniteMesure; }
    public void setUniteMesure(String uniteMesure) { this.uniteMesure = uniteMesure; }
}
