package com.example.back.repository;

import com.example.back.model.ActionHasFormation;
import com.example.back.model.ActionHasFormationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ActionHasFormationRepository extends JpaRepository<ActionHasFormation, ActionHasFormationId> {

    @Query("SELECT a.idAction AS idAction, f.idFormation AS idFormation, a.typeAction AS typeAction, af.dateAction AS dateAction " +
            "FROM ActionHasFormation af " +
            "JOIN af.formation f " +
            "JOIN af.action a " +
            "WHERE f.idFormation = :idFormation")
    List<ActionFormationProjection> getActionDetailsByFormation(@Param("idFormation") Integer idFormation);

    Optional<ActionHasFormation> findById_IdActionAndId_IdFormation(Integer idAction, Integer idFormation);

}
