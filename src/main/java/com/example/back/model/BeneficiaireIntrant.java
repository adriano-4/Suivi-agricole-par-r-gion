package com.example.back.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "beneficiaire_intrant")
public class BeneficiaireIntrant {

    @EmbeddedId
    private BeneficiaireIntrantId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idBenef")
    @JoinColumn(name = "id_benef")
    private Beneficiaire beneficiaire;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idIntrant")
    @JoinColumn(name = "id_intrant")
    private Intrant intrant;

    @Column(nullable = false)
    private BigDecimal quantite;

    public BeneficiaireIntrant() {}

    public BeneficiaireIntrant(Beneficiaire beneficiaire, Intrant intrant) {
        this.beneficiaire = beneficiaire;
        this.intrant = intrant;
        this.id = new BeneficiaireIntrantId(
                beneficiaire.getId(),
                intrant.getIdIntrant()
        );
        this.quantite = BigDecimal.ZERO;
    }

    public BeneficiaireIntrantId getId() {
        return id;
    }

    public Beneficiaire getBeneficiaire() {
        return beneficiaire;
    }

    public Intrant getIntrant() {
        return intrant;
    }

    public BigDecimal getQuantite() {
        return quantite;
    }

    public void setQuantite(BigDecimal quantite) {
        this.quantite = quantite;
    }
}
