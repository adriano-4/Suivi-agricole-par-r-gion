package com.example.back.repository;

import com.example.back.model.ApportBeneficiaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ApportBeneficiaireRepository extends JpaRepository<ApportBeneficiaire, Integer> {

    @Query("""
    SELECT a FROM ApportBeneficiaire a
    LEFT JOIN FETCH a.unite u
    LEFT JOIN FETCH a.beneficiaire b
    WHERE b.id = :idBenef
""")
    List<ApportBeneficiaire> findByBeneficiaireId(@Param("idBenef") Integer idBenef);
}
