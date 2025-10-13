package com.example.back.service;

import com.example.back.model.FormationView;
import com.example.back.repository.FormationViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormationViewService {

    @Autowired
    private FormationViewRepository repository;

    public List<FormationView> getAllFormations() {
        return repository.findAll();
    }

    public List<FormationView> getFormationsByRegion(String nomReg) {
        return repository.findByNomReg(nomReg);
    }
}
