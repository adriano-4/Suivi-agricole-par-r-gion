package com.example.back.repository;

import com.example.back.model.BeneficiaireView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeneficiaireViewRepository extends JpaRepository<BeneficiaireView, Integer> {
    List<BeneficiaireView> findByNomBenefContainingIgnoreCase(String nom);
    List<BeneficiaireView> findByNomRegIgnoreCase(String nomReg);
}
