package com.example.back.repository;

import com.example.back.model.Fokontany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FokontanyRepository extends JpaRepository<Fokontany, Integer> {

    @Query("SELECT f FROM Fokontany f WHERE f.commune.idComm = :idComm")
    List<Fokontany> findByCommuneId(@Param("idComm") Integer idComm);
}
