package com.example.back.repository;

import com.example.back.model.Beneficiaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeneficiaireRepository extends JpaRepository<Beneficiaire, Integer> {
}
