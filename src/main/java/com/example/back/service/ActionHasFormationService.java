package com.example.back.service;

import com.example.back.model.ActionHasFormation;
import com.example.back.repository.ActionFormationProjection;
import com.example.back.repository.ActionHasFormationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ActionHasFormationService {

    @Autowired
    private ActionHasFormationRepository actionHasFormationRepository;

    public List<ActionFormationProjection> getActionDetailsByFormationId(Integer idFormation) {
        return actionHasFormationRepository.getActionDetailsByFormation(idFormation);
    }

    @Transactional
    public ActionHasFormation updateActionDate(Integer idAction, Integer idFormation, LocalDate newDate) {
        Optional<ActionHasFormation> optionalAction = actionHasFormationRepository
                .findById_IdActionAndId_IdFormation(idAction, idFormation);

        ActionHasFormation action = optionalAction
                .orElseThrow(() -> new EntityNotFoundException(
                        "Action non trouvée avec idAction " + idAction + " et idFormation " + idFormation));

        action.setDateAction(newDate);
        return actionHasFormationRepository.save(action);
    }

}
