package com.example.back.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example. back.model.SuperficieRegion;
import com.example.back.repository.SuperficieRegionRepository;

@Service
public class SuperficieRegionService {

    @Autowired
    private SuperficieRegionRepository superficieRegionRepository;

    public List<SuperficieRegion> getAllSuperficies() {
        return superficieRegionRepository.findAll();
    }
}
