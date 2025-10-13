package com.example.back.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "district")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dist")
    private Integer id_dist;




    @Column(nullable = false)
    private String nom_dist;

    @ManyToOne
    @JoinColumn(name = "id_reg")
    private Region region;

    // getters et setters
    public Integer getIdDist() { return id_dist; }
    public void setIdDist(Integer idDist) { this.id_dist = idDist; }

    public String getNomDist() { return nom_dist; }
    public void setNomDist(String nomDist) { this.nom_dist = nomDist; }

    public Region getRegion() { return region; }
    public void setRegion(Region region) { this.region = region; }
}
