package com.example.back.repository;

import com.example.back.model.ActionEtatView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActionEtatViewRepository
        extends JpaRepository<ActionEtatView, Long> {

    List<ActionEtatView> findByRegion(String region);

    List<ActionEtatView> findByEtat(Integer etat);
}
