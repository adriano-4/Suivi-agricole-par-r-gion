package com.example.back.service;

import com.example.back.repository.ActionFormationProjection;
import com.example.back.repository.ActionHasFormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionHasFormationService {

    @Autowired
    private ActionHasFormationRepository actionHasFormationRepository;

    public List<ActionFormationProjection> getActionDetailsByFormationId(Integer idFormation) {
        return actionHasFormationRepository.getActionDetailsByFormation(idFormation);
    }
}
