package com.example.back.repository;

import com.example.back.model.FormationView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormationViewRepository extends JpaRepository<FormationView, Integer> {
    List<FormationView> findByNomReg(String nomReg);
}
