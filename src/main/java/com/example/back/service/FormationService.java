package com.example.back.service;

import com.example.back.dto.FormationCreateRequest;
import com.example.back.model.*;
import com.example.back.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FormationService {

    private final FormationRepository formationRepo;
    private final AppartenanceRepository appartenanceRepo;
    private final SuperviseurRepository superviseurRepo;
    private final TechnicienRepository technicienRepo;
    private final VulgarisationRepository vulgarisationRepo;
    private final ActionRepository actionRepo;
    private final ActionHasFormationRepository ahfRepo;

    public FormationService(
            FormationRepository formationRepo,
            AppartenanceRepository appartenanceRepo,
            SuperviseurRepository superviseurRepo,
            TechnicienRepository technicienRepo,
            VulgarisationRepository vulgarisationRepo,
            ActionRepository actionRepo,
            ActionHasFormationRepository ahfRepo
    ) {
        this.formationRepo = formationRepo;
        this.appartenanceRepo = appartenanceRepo;
        this.superviseurRepo = superviseurRepo;
        this.technicienRepo = technicienRepo;
        this.vulgarisationRepo = vulgarisationRepo;
        this.actionRepo = actionRepo;
        this.ahfRepo = ahfRepo;
    }

    @Transactional
    public Formation createFormationWithActions(FormationCreateRequest req) {
        Appartenance appart = appartenanceRepo.findById(req.getIdAppartenance())
                .orElseThrow(() -> new RuntimeException("Appartenance non trouvée"));
        Superviseur sup = superviseurRepo.findById(req.getIdSuperviseur())
                .orElseThrow(() -> new RuntimeException("Superviseur non trouvé"));
        Technicien tech = technicienRepo.findById(req.getIdTechnicien())
                .orElseThrow(() -> new RuntimeException("Technicien non trouvé"));

        Vulgarisation vul = new Vulgarisation();

        vul = vulgarisationRepo.save(vul);

        Formation formation = new Formation();
        formation.setAppartenance(appart);
        formation.setSuperviseur(sup);
        formation.setTechnicien(tech);
        formation.setVulgarisation(vul);
        formation.setDateFormation(req.getDateFormation());
        formation.setRemarque(req.getRemarque());

        formation = formationRepo.save(formation);

        List<Action> allActions = actionRepo.findAll();
        for (Action action : allActions) {
            ActionHasFormation ahf = new ActionHasFormation();
            ActionHasFormationId ahfId = new ActionHasFormationId(action.getIdAction(), formation.getIdFormation());
            ahf.setId(ahfId);
            ahf.setAction(action);
            ahf.setFormation(formation);
            ahf.setDateAction(null);
            ahfRepo.save(ahf);
        }

        return formation;
    }

    @Transactional
    public Formation updateFormation(Integer idFormation, FormationCreateRequest req) {
        System.out.println("✅ ID reçu pour updateFormation: " + idFormation);
        System.out.println("✅ ID reçu pour updateFormation: " + req.getIdAppartenance());
        System.out.println("✅ ID reçu pour updateFormation: " + req.getIdSuperviseur());
        System.out.println("✅ ID reçu pour updateFormation: " + req.getIdTechnicien());

        Formation existing = formationRepo.findById(idFormation)
                .orElseThrow(() -> new RuntimeException("Formation introuvable avec l'id : " + idFormation));
        Appartenance appart = appartenanceRepo.findById(req.getIdAppartenance())
                .orElseThrow(() -> new RuntimeException("Appartenance non trouvée"));
        Superviseur sup = superviseurRepo.findById(req.getIdSuperviseur())
                .orElseThrow(() -> new RuntimeException("Superviseur non trouvé"));
        Technicien tech = technicienRepo.findById(req.getIdTechnicien())
                .orElseThrow(() -> new RuntimeException("Technicien non trouvé"));

        existing.setAppartenance(appart);
        existing.setSuperviseur(sup);
        existing.setTechnicien(tech);
        existing.setDateFormation(req.getDateFormation());
        existing.setRemarque(req.getRemarque());

        System.out.println("=== DEBUG FORMATION UPDATE ===");
        System.out.println("idFormation reçu: " + idFormation);
        System.out.println("Formation existante: " + existing.getIdFormation());

        return formationRepo.save(existing);
    }

}
