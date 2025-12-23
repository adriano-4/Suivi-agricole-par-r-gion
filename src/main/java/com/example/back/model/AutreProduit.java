package com.example.back.model;

import jakarta.persistence.*;

@Entity
@Table(name = "autreproduit")
public class AutreProduit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produit")
    private Integer idProduit;

    @Column(name = "type_produit", length = 100, nullable = false)
    private String typeProduit;

    @ManyToOne
    @JoinColumn(name = "id_unite", nullable = false)
    private Unite unite;

    public Integer getIdProduit() {
        return idProduit;
    }

    public void setIdProduit(Integer idProduit) {
        this.idProduit = idProduit;
    }

    public String getTypeProduit() {
        return typeProduit;
    }

    public void setTypeProduit(String typeProduit) {
        this.typeProduit = typeProduit;
    }

    public Unite getUnite() {
        return unite;
    }

    public void setUnite(Unite unite) {
        this.unite = unite;
    }
}
