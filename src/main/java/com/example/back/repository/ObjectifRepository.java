package com.example.back.repository;

import com.example.back.model.Objectif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ObjectifRepository extends JpaRepository<Objectif, Integer> {
    @Query("SELECT new map(o.idObj as idObj, o.libelle as libelle, o.quantiteObj as quantiteObj, u.uniteMesure as unite) " +
            "FROM Objectif o JOIN o.unite u")
    List<Map<String, Object>> findAllWithUnite();

}

