package com.example.back.controller;

import com.example.back.dto.ActionUpdateRequest;
import com.example.back.dto.FormationCreateRequest;
import com.example.back.model.ActionHasFormation;
import com.example.back.model.Formation;
import com.example.back.repository.ActionFormationProjection;
import com.example.back.repository.ActionHasFormationRepository;
import com.example.back.repository.FormationRepository;
import com.example.back.service.ActionHasFormationService;
import com.example.back.service.FormationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formations")
public class FormationController {

    private final FormationRepository formationRepository;
    private final FormationService formationService;
    private final ActionHasFormationService actionHasFormationService;


    @Autowired
    public FormationController(FormationRepository formationRepository, FormationService formationService, ActionHasFormationService actionHasFormationService) {
        this.formationRepository = formationRepository;
        this.formationService = formationService;
        this.actionHasFormationService = actionHasFormationService;
    }

    @GetMapping
    public List<Formation> getAllFormations() {
        return formationRepository.findAll();
    }

    @PostMapping
    public Formation createFormation(@RequestBody FormationCreateRequest req) {
        return formationService.createFormationWithActions(req);
    }

    @Autowired
    private ActionHasFormationRepository actionHasFormationRepository;

    @GetMapping("/actions/{idFormation}")
    public ResponseEntity<List<ActionFormationProjection>> getActionDetailsByFormation(
            @PathVariable Integer idFormation
    ) {
        List<ActionFormationProjection> actions = actionHasFormationService.getActionDetailsByFormationId(idFormation);
        return ResponseEntity.ok(actions);
    }

    @PutMapping("/{idFormation}")
    public ResponseEntity<Formation> updateFormation(@PathVariable Integer idFormation, @RequestBody FormationCreateRequest req) {
        Formation updatedFormation = formationService.updateFormation(idFormation, req);
        return ResponseEntity.ok(updatedFormation);
    }

    @PutMapping("/actions/{idAction}/formation/{idFormation}")
    public ResponseEntity<ActionHasFormation> updateActionDate(
            @PathVariable Integer idAction,
            @PathVariable Integer idFormation,
            @RequestBody ActionUpdateRequest req
    ) {
        ActionHasFormation updatedAction = actionHasFormationService
                .updateActionDate(idAction, idFormation, req.getDateAction());
        return ResponseEntity.ok(updatedAction);
    }
}
