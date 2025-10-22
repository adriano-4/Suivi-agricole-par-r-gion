package com.example.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.back.model.SuperficieRegion;

@Repository
public interface SuperficieRegionRepository extends JpaRepository<SuperficieRegion, String> {
}
