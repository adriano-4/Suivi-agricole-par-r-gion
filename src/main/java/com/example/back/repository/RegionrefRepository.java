package com.example.back.repository;

import com.example.back.model.Regionref;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionrefRepository extends JpaRepository<Regionref, Integer> {
}
