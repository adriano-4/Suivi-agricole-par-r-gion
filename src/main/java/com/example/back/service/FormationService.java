package com.example.back.service;

import com.example.back.dto.FormationCreateRequest;
import com.example.back.model.*;
import com.example.back.repository.*;
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

        // 2. Créer une entité Vulgarisation “vide” avec juste l’ID ou par défaut
        Vulgarisation vul = new Vulgarisation();
        // Ici, tu peux décider soit de :
        // a) créer une nouvelle Vulgarisation vide et la sauvegarder pour avoir un idVulgarisation
        // b) ou si tu as déjà un idVulgarisation à passer, tu peux le charger
        // Pour l’exemple je vais sauvegarder une vulgarisation vide :

        vul = vulgarisationRepo.save(vul);

        // 3. Créer la Formation
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
}
