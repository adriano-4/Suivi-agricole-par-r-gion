package com.example.back.service;

import com.example.back.model.Region;
import com.example.back.model.Regionref;
import com.example.back.repository.RegionRepository;
import com.example.back.repository.RegionrefRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionService {

    @Autowired
    private RegionRepository regionRepository;
    @Autowired
    private RegionrefRepository regionrefRepository;

    public List<Region> getAllRegions() {
        return regionRepository.findAll();
    }
    public Region saveRegion(Region region) {
        return regionRepository.save(region);
    }

}
