package com.example.back.repository;

import com.example.back.model.StatView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface StatRepository extends JpaRepository<StatView, String> {

    @Query(value = "SELECT * FROM v_stat", nativeQuery = true)
    List<StatView> findAllStats();

    @Query(value = "SELECT * FROM v_stat WHERE region = :region", nativeQuery = true)
    StatView findByRegion(@Param("region") String region);
}
