package com.example.back.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "campagneriz")
public class CampagneRiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_campagne")
    private Integer idCampagne;

    @ManyToOne
    @JoinColumn(name = "id_benef", nullable = false)
    private Beneficiaire beneficiaire;

    @Column(name = "date_mise")
    private LocalDateTime dateMise;

    @Column(name = "sup_tot_prec")
    private BigDecimal supTotPrec;

    @Column(name = "rendement_prec")
    private BigDecimal rendementPrec;

    @Column(name = "variete_riz")
    private String varieteRiz;

    @Column(name = "sup_tot_actuelle")
    private BigDecimal supTotActuelle;

    @Column(name = "sup_fsrp_actuelle")
    private  BigDecimal supFsrpActuelle;

    public Integer getIdCampagne() { return idCampagne; }
    public void setIdCampagne(Integer idCampagne) { this.idCampagne = idCampagne; }

    public Beneficiaire getBeneficiaire() { return beneficiaire; }
    public void setBeneficiaire(Beneficiaire beneficiaire) { this.beneficiaire = beneficiaire; }

    public LocalDateTime getDateMise() { return dateMise; }
    public void setDateMise(LocalDateTime dateMise) { this.dateMise = dateMise; }

    public BigDecimal getSupTotPrec() { return supTotPrec; }
    public void setSupTotPrec(BigDecimal supTotPrec) { this.supTotPrec = supTotPrec; }

    public BigDecimal getRendementPrec() { return rendementPrec; }
    public void setRendementPrec(BigDecimal rendementPrec) { this.rendementPrec = rendementPrec; }

    public String getVarieteRiz() { return varieteRiz; }
    public void setVarieteRiz(String varieteRiz) { this.varieteRiz = varieteRiz; }

    public BigDecimal getSupTotActuelle() { return supTotActuelle; }
    public void setSupTotActuelle(BigDecimal supTotActuelle) { this.supTotActuelle = supTotActuelle; }

    public BigDecimal getSupFsrpActuelle() { return supFsrpActuelle; }
    public void setSupFsrpActuelle(BigDecimal supFsrpActuelle) { this.supFsrpActuelle = supFsrpActuelle; }
}
