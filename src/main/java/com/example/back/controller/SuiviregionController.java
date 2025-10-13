package com.example.back.controller;

import com.example.back.model.Suiviregion;
import com.example.back.repository.SuiviregionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/suiviregions")
public class SuiviregionController {

    @Autowired
    private SuiviregionRepository SuiviregionRepository;

    @GetMapping
    public List<Suiviregion> getAllSuiviregions() {
        return SuiviregionRepository.findAll();
    }
}
