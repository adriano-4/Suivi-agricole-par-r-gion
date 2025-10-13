package com.example.back.controller;

import com.example.back.model.CampagneRiz;
import com.example.back.repository.CampagneRizRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campagnes")
public class CampagneRizController {

    private final CampagneRizRepository repository;

    public CampagneRizController(CampagneRizRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<CampagneRiz> getAll() {
        return repository.findAll();
    }

    @GetMapping("/beneficiaire/{idBenef}")
    public List<CampagneRiz> getByBeneficiaire(@PathVariable Integer idBenef) {
        return repository.findByBeneficiaireId(idBenef);
    }

    @PostMapping
    public CampagneRiz add(@RequestBody CampagneRiz campagne) {
        return repository.save(campagne);
    }
}
