package com.example.back.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BeneficiaireIntrantId implements Serializable {

    @Column(name = "id_benef")
    private Integer idBenef;

    @Column(name = "id_intrant")
    private Integer idIntrant;

    public BeneficiaireIntrantId() {}

    public BeneficiaireIntrantId(Integer idBenef, Integer idIntrant) {
        this.idBenef = idBenef;
        this.idIntrant = idIntrant;
    }

    public Integer getIdBenef() {
        return idBenef;
    }

    public Integer getIdIntrant() {
        return idIntrant;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BeneficiaireIntrantId)) return false;
        BeneficiaireIntrantId that = (BeneficiaireIntrantId) o;
        return Objects.equals(idBenef, that.idBenef) &&
                Objects.equals(idIntrant, that.idIntrant);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idBenef, idIntrant);
    }
}
