package com.example.back.controller;

import com.example.back.dto.ApportResponse;
import com.example.back.dto.ApportUpdateRequest;
import com.example.back.model.ApportBeneficiaire;
import com.example.back.service.ApportBeneficiaireService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apports")
public class ApportBeneficiaireController {

    private final ApportBeneficiaireService service;

    public ApportBeneficiaireController(ApportBeneficiaireService service) {
        this.service = service;
    }

    @GetMapping("/beneficiaire/{idBenef}")
    public List<ApportResponse> getApportsByBeneficiaire(@PathVariable Integer idBenef) {
        return service.getApportsByBeneficiaire(idBenef);
    }

//    @PutMapping("/{id}")
//    public ApportBeneficiaire updateApport(
//            @PathVariable Integer id,
//            @RequestBody ApportUpdateRequest request) {
//        return service.updateApport(id, request);
//    }

    @PutMapping("/{id}")
    public ApportResponse updateApport(
            @PathVariable Integer id,
            @RequestBody ApportUpdateRequest request) {
        ApportBeneficiaire updated = service.updateApport(id, request);

        ApportResponse dto = new ApportResponse();
        dto.setId(updated.getIdApport());
        dto.setTypeApport(updated.getTypeApport());
        dto.setQuantite(updated.getQuantite().doubleValue());
        dto.setIdUnite(updated.getUnite().getIdUnite());
        dto.setUniteMesure(updated.getUnite().getUniteMesure());

        return dto;
    }

}
