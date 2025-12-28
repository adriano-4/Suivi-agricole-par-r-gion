package com.example.back.model;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "objectif")
public class Objectif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_obj")
    private Integer idObj;

    private String libelle;

    @Column(name = "quantite_obj")
    private BigDecimal quantiteObj;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_unite", insertable = false, updatable = false)
    private Unite unite;

    @Column(name = "id_unite")
    private Integer idUnite;

    // Getters et setters
    public Integer getIdObj() { return idObj; }
    public void setIdObj(Integer idObj) { this.idObj = idObj; }

    public String getLibelle() { return libelle; }
    public void setLibelle(String libelle) { this.libelle = libelle; }

    public BigDecimal getQuantiteObj() { return quantiteObj; }
    public void setQuantiteObj(BigDecimal quantiteObj) { this.quantiteObj = quantiteObj; }

    public Integer getIdUnite() { return idUnite; }
    public void setIdUnite(Integer idUnite) { this.idUnite = idUnite; }

    public Unite getUnite() { return unite; }
    public void setUnite(Unite unite) { this.unite = unite; }
}

