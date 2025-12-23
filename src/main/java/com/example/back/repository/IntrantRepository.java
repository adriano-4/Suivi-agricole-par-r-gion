package com.example.back.repository;
import com.example.back.model.Intrant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntrantRepository extends JpaRepository<Intrant, Integer> {}
