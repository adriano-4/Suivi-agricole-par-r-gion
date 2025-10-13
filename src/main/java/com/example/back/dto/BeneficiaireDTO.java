package com.example.back.dto;

import java.time.LocalDate;

public class BeneficiaireDTO {

    private Integer idBenef;
    private String cin;
    private String nomBenef;
    private String prenomBenef;
    private String surnomBenef;
    private String genre;
    private LocalDate datNais;
    private String lieuNais;
    private String situationMat;
    private String nomConjoint;
    private String contact;
    private String remarqueSup;

    private String nomAppartenance;
    private String nomAue;
    private String nomFok;
    private String nomComm;
    private String nomDist;
    private String nomReg;

    private LocalDate dateMise;
    private Double supTotPrec;
    private Double rendementPrec;
    private String varieteRiz;
    private Double supTotActuelle;
    private Double supFSRPActuelle;

    private String typeApport;
    private Double quantite;

    // --- Getters & Setters ---
    public Integer getIdBenef() { return idBenef; }
    public void setIdBenef(Integer idBenef) { this.idBenef = idBenef; }

    public String getCin() { return cin; }
    public void setCin(String cin) { this.cin = cin; }

    public String getNomBenef() { return nomBenef; }
    public void setNomBenef(String nomBenef) { this.nomBenef = nomBenef; }

    public String getPrenomBenef() { return prenomBenef; }
    public void setPrenomBenef(String prenomBenef) { this.prenomBenef = prenomBenef; }

    public String getSurnomBenef() { return surnomBenef; }
    public void setSurnomBenef(String surnomBenef) { this.surnomBenef = surnomBenef; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public LocalDate getDatNais() { return datNais; }
    public void setDatNais(LocalDate datNais) { this.datNais = datNais; }

    public String getLieuNais() { return lieuNais; }
    public void setLieuNais(String lieuNais) { this.lieuNais = lieuNais; }

    public String getSituationMat() { return situationMat; }
    public void setSituationMat(String situationMat) { this.situationMat = situationMat; }

    public String getNomConjoint() { return nomConjoint; }
    public void setNomConjoint(String nomConjoint) { this.nomConjoint = nomConjoint; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getRemarqueSup() { return remarqueSup; }
    public void setRemarqueSup(String remarqueSup) { this.remarqueSup = remarqueSup; }

    public String getNomAppartenance() { return nomAppartenance; }
    public void setNomAppartenance(String nomAppartenance) { this.nomAppartenance = nomAppartenance; }

    public String getNomAue() { return nomAue; }
    public void setNomAue(String nomAue) { this.nomAue = nomAue; }

    public String getNomFok() { return nomFok; }
    public void setNomFok(String nomFok) { this.nomFok = nomFok; }

    public String getNomComm() { return nomComm; }
    public void setNomComm(String nomComm) { this.nomComm = nomComm; }

    public String getNomDist() { return nomDist; }
    public void setNomDist(String nomDist) { this.nomDist = nomDist; }

    public String getNomReg() { return nomReg; }
    public void setNomReg(String nomReg) { this.nomReg = nomReg; }

    public LocalDate getDateMise() { return dateMise; }
    public void setDateMise(LocalDate dateMise) { this.dateMise = dateMise; }

    public Double getSupTotPrec() { return supTotPrec; }
    public void setSupTotPrec(Double supTotPrec) { this.supTotPrec = supTotPrec; }

    public Double getRendementPrec() { return rendementPrec; }
    public void setRendementPrec(Double rendementPrec) { this.rendementPrec = rendementPrec; }

    public String getVarieteRiz() { return varieteRiz; }
    public void setVarieteRiz(String varieteRiz) { this.varieteRiz = varieteRiz; }

    public Double getSupTotActuelle() { return supTotActuelle; }
    public void setSupTotActuelle(Double supTotActuelle) { this.supTotActuelle = supTotActuelle; }

    public Double getSupFSRPActuelle() { return supFSRPActuelle; }
    public void setSupFSRPActuelle(Double supFSRPActuelle) { this.supFSRPActuelle = supFSRPActuelle; }

    public String getTypeApport() { return typeApport; }
    public void setTypeApport(String typeApport) { this.typeApport = typeApport; }

    public Double getQuantite() { return quantite; }
    public void setQuantite(Double quantite) { this.quantite = quantite; }
}
