package com.example.back.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "apportbeneficiaire")
public class ApportBeneficiaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_apport")
    private Integer idApport;

    @ManyToOne
    @JoinColumn(name = "id_benef", nullable = false)
    private Beneficiaire beneficiaire;

    @ManyToOne(optional = true)
    @JoinColumn(name = "id_unite", nullable = true)
    private Unite unite;

    @Column(name = "type_apport")
    private String typeApport;

    @Column(name = "quantite", precision = 10, scale = 2)
    private BigDecimal quantite;



    // --- GETTERS & SETTERS ---
    public Integer getIdApport() { return idApport; }
    public void setIdApport(Integer idApport) { this.idApport = idApport; }

    public Beneficiaire getBeneficiaire() { return beneficiaire; }
    public void setBeneficiaire(Beneficiaire beneficiaire) { this.beneficiaire = beneficiaire; }

    public Unite getUnite() { return unite; }
    public void setUnite(Unite unite) { this.unite = unite; }

    public String getTypeApport() { return typeApport; }
    public void setTypeApport(String typeApport) { this.typeApport = typeApport; }

    public BigDecimal getQuantite() { return quantite; }
    public void setQuantite(BigDecimal quantite) { this.quantite = quantite; }
}
