package com.example.back.service;

import com.example.back.model.Beneficiaire;
import com.example.back.model.Suiviregion;
import com.example.back.repository.BeneficiaireRepository;
import com.example.back.repository.RegionrefRepository;
import com.example.back.repository.SuiviregionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuiviregionService {

    @Autowired
    private SuiviregionRepository SuiviregionRepository;

    public List<Suiviregion> getAllSuiviregions() {
        return SuiviregionRepository.findAll();
    }
}
