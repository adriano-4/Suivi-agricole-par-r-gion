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

@Service
public class ActionHasFormationService {

    @Autowired
    private ActionHasFormationRepository actionHasFormationRepository;

    public List<ActionFormationProjection> getActionDetailsByFormationId(Integer idFormation) {
        return actionHasFormationRepository.getActionDetailsByFormation(idFormation);
    }

    @Transactional
    public ActionHasFormation updateActionDate(Integer idAction, LocalDate newDate) {
        List<ActionHasFormation> actions = actionHasFormationRepository.findAll()
                .stream()
                .filter(af -> af.getId().getIdAction().equals(idAction))
                .toList();

        if (actions.isEmpty()) {
            throw new EntityNotFoundException("Action non trouvée avec idAction " + idAction);
        }

        ActionHasFormation action = actions.get(0);
        action.setDateAction(newDate);
        return actionHasFormationRepository.save(action);
    }
}
