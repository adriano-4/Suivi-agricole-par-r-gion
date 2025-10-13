package com.example.back.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "region")
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reg")
    private Integer id;

    @Column(name = "nom_reg", nullable = false, length = 100)
    private String nomReg;

    @ManyToOne
    @JoinColumn(name = "id_reg_ref", referencedColumnName = "id_reg_ref")
    private Regionref regionref;

    @OneToMany(mappedBy = "region", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<District> districts;

    public Region() {}

    public Region(String nomReg, Regionref regionref) {
        this.nomReg = nomReg;
        this.regionref = regionref;
    }

    // --- Getters & Setters ---
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomReg() {
        return nomReg;
    }

    public void setNomReg(String nomReg) {
        this.nomReg = nomReg;
    }

    public Regionref getRegionref() {
        return regionref;
    }

    public void setRegionref(Regionref regionref) {
        this.regionref = regionref;
    }
}
