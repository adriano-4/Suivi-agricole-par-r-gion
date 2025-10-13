package com.example.back.repository;

import com.example.back.model.ActionHasFormation;
import com.example.back.model.ActionHasFormationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActionHasFormationRepository extends JpaRepository<ActionHasFormation, ActionHasFormationId> {

    @Query("SELECT f.idFormation as idFormation, a.typeAction as typeAction, af.dateAction as dateAction " +
            "FROM ActionHasFormation af " +
            "JOIN af.formation f " +
            "JOIN af.action a " +
            "WHERE f.idFormation = :idFormation")
    List<ActionFormationProjection> getActionDetailsByFormation(@Param("idFormation") Integer idFormation);
}
