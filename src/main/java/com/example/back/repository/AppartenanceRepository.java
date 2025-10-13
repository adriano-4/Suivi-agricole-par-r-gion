package com.example.back.repository;//package com.example.back.repository;
//
//import com.example.back.model.Appartenance;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public interface AppartenanceRepository extends JpaRepository<Appartenance, Integer> {
//}

import java.util.List;
import com.example.back.model.Appartenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppartenanceRepository extends JpaRepository<Appartenance, Integer> {
    @Query("SELECT a FROM Appartenance a WHERE a.fokontany.id_fok = :id")
    List<Appartenance> findByFokontany_IdFok(@Param("id") Integer id);

    @Query(value = """
    SELECT a.*
    FROM appartenance a
    JOIN fokontany f ON a.id_fok = f.id_fok
    JOIN commune c ON f.id_comm = c.id_comm
    JOIN district d ON c.id_dist = d.id_dist
    JOIN region r ON d.id_reg = r.id_reg
    WHERE r.id_reg = :regionId
""", nativeQuery = true)
    List<Appartenance> findAppartenancesByRegionIdNative(@Param("regionId") Integer regionId);
}

