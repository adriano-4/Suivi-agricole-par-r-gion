package com.example.back.controller;

import com.example.back.model.Regionref;
import com.example.back.repository.RegionrefRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/regionsref")
@CrossOrigin(origins = "http://localhost:5173")
public class RegionrefController {

    @Autowired
    private RegionrefRepository regionrefRepository;

    @GetMapping
    public List<Regionref> getAllRegions() {
        return regionrefRepository.findAll();
    }

    @GetMapping("/{id}")
    public Regionref getRegionById(@PathVariable Integer id) {
        return regionrefRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Région non trouvée avec id " + id));
    }
}
