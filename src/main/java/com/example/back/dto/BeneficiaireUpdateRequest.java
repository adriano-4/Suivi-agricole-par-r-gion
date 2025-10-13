package com.example.back.dto;

import com.example.back.model.Appartenance;
import com.example.back.model.Beneficiaire;
import com.example.back.model.CampagneRiz;

public class BeneficiaireUpdateRequest {
    private Beneficiaire beneficiaire;
    private CampagneRiz campagne;
    private Integer idAppartenance;

    public Beneficiaire getBeneficiaire() {
        return beneficiaire;
    }

    public void setBeneficiaire(Beneficiaire beneficiaire) {
        this.beneficiaire = beneficiaire;
    }

    public CampagneRiz getCampagne() {
        return campagne;
    }

    public void setCampagne(CampagneRiz campagne) {
        this.campagne = campagne;
    }
    public Integer getIdAppartenance() { return idAppartenance; }
    public void setIdAppartenance(Integer idAppartenance) { this.idAppartenance = idAppartenance; }
}
