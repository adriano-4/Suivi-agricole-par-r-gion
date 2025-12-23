package com.example.back.repository;

import com.example.back.dto.BeneficiaireIntrantDTO;
import com.example.back.model.BeneficiaireIntrant;
import com.example.back.model.BeneficiaireIntrantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

public interface BeneficiaireIntrantRepository
        extends JpaRepository<BeneficiaireIntrant, BeneficiaireIntrantId> {

    @Query("""
        SELECT new com.example.back.dto.BeneficiaireIntrantDTO(
            i.idIntrant,
            i.typeIntrant,
            bi.quantite,
            u.uniteMesure
        )
        FROM BeneficiaireIntrant bi
        JOIN bi.intrant i
        JOIN i.unite u
        WHERE bi.beneficiaire.id = :idBenef
    """)
    List<BeneficiaireIntrantDTO> findIntrantsByBeneficiaire(
            @Param("idBenef") Integer idBenef);

    @Modifying
    @Transactional
    @Query("""
    UPDATE BeneficiaireIntrant bi
    SET bi.quantite = :quantite
    WHERE bi.id.idBenef = :idBenef
      AND bi.id.idIntrant = :idIntrant
""")
    int updateQuantite(
            @Param("idBenef") Integer idBenef,
            @Param("idIntrant") Integer idIntrant,
            @Param("quantite") BigDecimal quantite
    );

}



