package com.example.back.repository;

import com.example.back.model.AutreProduit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutreProduitRepository extends JpaRepository<AutreProduit, Integer> {}
