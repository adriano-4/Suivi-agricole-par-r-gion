package com.example.back.repository;

import com.example.back.model.CampagneRiz;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CampagneRizRepository extends JpaRepository<CampagneRiz, Integer> {
    List<CampagneRiz> findByBeneficiaireId(Integer idBenef);
}
