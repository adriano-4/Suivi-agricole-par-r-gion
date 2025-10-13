package com.example.back.controller;

import com.example.back.model.Commune;
import com.example.back.service.CommuneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/communes")
@CrossOrigin(origins = "http://localhost:5173")
public class CommuneController {

    @Autowired
    private CommuneService communeService;

    @GetMapping
    public List<Commune> getAllCommunes() {
        return communeService.getAllCommunes();
    }

    @GetMapping("/district/{districtId}")
    public List<Commune> getCommunesByDistrict(@PathVariable Integer districtId) {
        return communeService.getCommunesByDistrict(districtId);
    }

    @PostMapping("/district/{districtId}")
    public Commune addCommune(@PathVariable Integer districtId, @RequestBody Commune commune) {
        return communeService.saveCommune(districtId, commune);
    }

    @DeleteMapping("/{communeId}")
    public void deleteCommune(@PathVariable Integer communeId) {
        communeService.deleteCommune(communeId);
    }
}
