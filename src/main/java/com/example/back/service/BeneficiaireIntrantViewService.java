package com.example.back.service;
import com.example.back.model.BeneficiaireIntrantView;
import com.example.back.repository.BeneficiaireIntrantViewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeneficiaireIntrantViewService {

    private final BeneficiaireIntrantViewRepository repository;

    public BeneficiaireIntrantViewService(BeneficiaireIntrantViewRepository repository) {
        this.repository = repository;
    }

    public List<BeneficiaireIntrantView> getAll() {
        return repository.findAll();
    }

    public List<BeneficiaireIntrantView> getByRegion(String region) {
        return repository.findByRegionJPQL(region);
    }

}
