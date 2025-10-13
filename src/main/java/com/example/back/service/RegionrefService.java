package com.example.back.service;

import com.example.back.model.Regionref;
import com.example.back.repository.RegionrefRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RegionrefService {

    @Autowired
    private RegionrefRepository regionrefRepository;

   public List<Regionref> getAllRegions() {
        return regionrefRepository.findAll();
    }

    public Regionref getRegionById(Integer id) {
        return regionrefRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Région non trouvée avec id " + id));
    }
}
