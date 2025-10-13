package com.example.back.service;

import com.example.back.model.Appartenance;
import com.example.back.model.ApportBeneficiaire;
import com.example.back.model.Beneficiaire;
import com.example.back.model.CampagneRiz;
import com.example.back.repository.AppartenanceRepository;
import com.example.back.repository.ApportBeneficiaireRepository;
import com.example.back.repository.BeneficiaireRepository;
import com.example.back.repository.CampagneRizRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BeneficiaireService {

    private final BeneficiaireRepository beneficiaireRepo;
    private final AppartenanceRepository appartenanceRepo;
    private final CampagneRizRepository campagneRepo;
    private final ApportBeneficiaireRepository apportRepo;

    public BeneficiaireService(BeneficiaireRepository beneficiaireRepo,
                               AppartenanceRepository appartenanceRepo,
                               CampagneRizRepository campagneRepo,
                               ApportBeneficiaireRepository apportRepo) {
        this.beneficiaireRepo = beneficiaireRepo;
        this.appartenanceRepo = appartenanceRepo;
        this.campagneRepo = campagneRepo;
        this.apportRepo = apportRepo;
    }

    public List<Beneficiaire> getAllBeneficiaires() {
        return beneficiaireRepo.findAll();
    }

    @Transactional
    public Beneficiaire addBeneficiaireAvecRelations(Beneficiaire beneficiaire) {
        if (beneficiaire.getAppartenance() != null &&
                beneficiaire.getAppartenance().getIdAppartenance() != null) {

            Appartenance appartenance = appartenanceRepo
                    .findById(beneficiaire.getAppartenance().getIdAppartenance())
                    .orElseThrow(() -> new RuntimeException("Appartenance introuvable"));

            beneficiaire.setAppartenance(appartenance);
        }

        Beneficiaire savedBenef = beneficiaireRepo.save(beneficiaire);

        CampagneRiz campagne = new CampagneRiz();
        campagne.setBeneficiaire(savedBenef);
        campagneRepo.save(campagne);

        ApportBeneficiaire apport = new ApportBeneficiaire();
        apport.setBeneficiaire(savedBenef);
        apportRepo.save(apport);

        return savedBenef;
    }

    @Transactional
    public Beneficiaire updateBeneficiaire(Integer id, Beneficiaire updatedData, CampagneRiz updatedCampagne, Integer idAppartenance) {
        Beneficiaire beneficiaire = beneficiaireRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Bénéficiaire introuvable avec id : " + id));

        // Mise à jour des infos du bénéficiaire
        beneficiaire.setNom(updatedData.getNom());
        beneficiaire.setPrenom(updatedData.getPrenom());
        beneficiaire.setSurnom(updatedData.getSurnom());
        beneficiaire.setCin(updatedData.getCin());
        beneficiaire.setGenre(updatedData.getGenre());
        beneficiaire.setDateNaissance(updatedData.getDateNaissance());
        beneficiaire.setLieuNaissance(updatedData.getLieuNaissance());
        beneficiaire.setSituationMatrimoniale(updatedData.getSituationMatrimoniale());
        beneficiaire.setNomConjoint(updatedData.getNomConjoint());
        beneficiaire.setContact(updatedData.getContact());
        beneficiaire.setRemarqueSup(updatedData.getRemarqueSup());

        // Mise à jour de l'appartenance si idAppartenance fourni
        if (idAppartenance != null) {
            Appartenance appartenance = appartenanceRepo.findById(idAppartenance)
                    .orElseThrow(() -> new RuntimeException("Appartenance introuvable avec id : " + idAppartenance));
            beneficiaire.setAppartenance(appartenance);
        }

        beneficiaireRepo.save(beneficiaire);

        // Mise à jour de la campagne si besoin
        if (updatedCampagne != null) {
            List<CampagneRiz> campagnes = campagneRepo.findByBeneficiaireId(beneficiaire.getId());
            if (!campagnes.isEmpty()) {
                CampagneRiz campagne = campagnes.get(0);
                campagne.setSupTotPrec(updatedCampagne.getSupTotPrec());
                campagne.setRendementPrec(updatedCampagne.getRendementPrec());
                campagne.setVarieteRiz(updatedCampagne.getVarieteRiz());
                campagne.setSupTotActuelle(updatedCampagne.getSupTotActuelle());
                campagne.setSupFsrpActuelle(updatedCampagne.getSupFsrpActuelle());
                campagneRepo.save(campagne);
            }
        }

        return beneficiaire;
    }

}
