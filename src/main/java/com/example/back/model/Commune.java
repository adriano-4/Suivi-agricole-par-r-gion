package com.example.back.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "commune")
public class Commune {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comm")
    private Integer idComm;

    @Column(name = "nom_comm",nullable = false)
    private String nomComm;

    @ManyToOne
    @JoinColumn(name = "id_dist")
    private District district;

    public Integer getIdComm() { return idComm; }
    public void setIdComm(Integer idComm) { this.idComm = idComm; }

    public String getNomComm() { return nomComm; }
    public void setNomComm(String nomComm) { this.nomComm = nomComm; }

    public District getDistrict() { return district; }
    public void setDistrict(District district) { this.district = district; }
}
