package com.example.back.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "regionref")
public class Regionref {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reg_ref")
    private Integer idRegRef;

    @Column(name = "nom_regref", nullable = false, length = 100)
    private String nomRegref;

    @Column(name = "latitude", precision = 10, scale = 6)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 10, scale = 6)
    private BigDecimal longitude;


    public Regionref() {
    }

    public Regionref(String nomRegref, BigDecimal latitude, BigDecimal longitude) {
        this.nomRegref = nomRegref;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Integer getIdRegRef() {
        return idRegRef;
    }

    public void setIdRegRef(Integer idRegRef) {
        this.idRegRef = idRegRef;
    }

    public String getNomRegref() {
        return nomRegref;
    }

    public void setNomRegref(String nomRegref) {
        this.nomRegref = nomRegref;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        return "Regionref{" +
                "idRegRef=" + idRegRef +
                ", nomRegref='" + nomRegref + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
