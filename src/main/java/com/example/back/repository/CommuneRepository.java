package com.example.back.repository;

import com.example.back.model.Commune;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommuneRepository extends JpaRepository<Commune, Integer> {
    @Query("SELECT c FROM Commune c WHERE c.district.id_dist = :idDist")
    List<Commune> findByDistrictIdDist(@Param("idDist") Integer idDist);}
