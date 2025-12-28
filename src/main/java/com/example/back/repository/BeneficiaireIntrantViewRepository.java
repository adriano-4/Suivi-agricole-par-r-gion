package com.example.back.repository;

import com.example.back.model.BeneficiaireIntrantView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeneficiaireIntrantViewRepository extends JpaRepository<BeneficiaireIntrantView, Long> {

    @Query("SELECT b FROM BeneficiaireIntrantView b WHERE b.region = :region")
    List<BeneficiaireIntrantView> findByRegionJPQL(@Param("region") String region);

}
