package com.example.back.controller;

import com.example.back.dto.BeneficiaireUpdateRequest;
import com.example.back.model.Beneficiaire;
import com.example.back.service.BeneficiaireService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiaires")
public class BeneficiaireController {

    private final BeneficiaireService service;

    public BeneficiaireController(BeneficiaireService service) {
        this.service = service;
    }

    @GetMapping
    public List<Beneficiaire> getAll() {
        return service.getAllBeneficiaires();
    }

    @PostMapping
    public Beneficiaire addBeneficiaire(@RequestBody Beneficiaire beneficiaire) {
        return service.addBeneficiaireAvecRelations(beneficiaire);
    }

    @PutMapping("/{id}")
    public Beneficiaire updateBeneficiaire(
            @PathVariable Integer id,
            @RequestBody BeneficiaireUpdateRequest request
    ) {
        return service.updateBeneficiaire(
                id,
                request.getBeneficiaire(),
                request.getCampagne(),
                request.getIdAppartenance()
        );
    }

}
