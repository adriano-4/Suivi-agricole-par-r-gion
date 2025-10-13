package com.example.back.repository;

import com.example.back.model.Suiviregion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SuiviregionRepository extends JpaRepository<Suiviregion, Long> {
}
