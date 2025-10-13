package com.example.back.service;

import com.example.back.model.BeneficiaireView;
import com.example.back.repository.BeneficiaireViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BeneficiaireViewService {

    @Autowired
    private BeneficiaireViewRepository repository;

    @Transactional(readOnly = true)
    public List<BeneficiaireView> getAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<BeneficiaireView> getById(Integer id) {
        return repository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<BeneficiaireView> searchByNom(String nom) {
        return repository.findByNomBenefContainingIgnoreCase(nom);
    }

    @Transactional(readOnly = true)
    public List<BeneficiaireView> getByRegion(String nomReg) {
        return repository.findByNomRegIgnoreCase(nomReg);
    }
}
