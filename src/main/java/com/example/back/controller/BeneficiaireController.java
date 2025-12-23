package com.example.back.controller;

import com.example.back.dto.BeneficiaireIntrantDTO;
import com.example.back.dto.BeneficiaireUpdateRequest;
import com.example.back.dto.UpdateQuantiteDTO;
import com.example.back.model.Beneficiaire;
import com.example.back.service.BeneficiaireIntrantService;
import com.example.back.service.BeneficiaireService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/beneficiaires")
public class BeneficiaireController {

    private final BeneficiaireService service;
    private final BeneficiaireIntrantService intrantService;


    public BeneficiaireController(
            BeneficiaireService service,
            BeneficiaireIntrantService intrantService) {
        this.service = service;
        this.intrantService = intrantService;
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

    @GetMapping("/{id}/intrants")
    public List<BeneficiaireIntrantDTO> getIntrants(
            @PathVariable Integer id) {
        return intrantService.getIntrantsByBeneficiaire(id);
    }

//    @PutMapping("/{idBenef}/intrants/{idIntrant}")
//    public void updateQuantite(
//            @PathVariable Integer idBenef,
//            @PathVariable Integer idIntrant,
//            @RequestParam BigDecimal quantite
//    ) {
//        intrantService.updateQuantiteIntrant(idBenef, idIntrant, quantite);
//    }
@PutMapping("/{idBenef}/intrants/{idIntrant}")
public void updateQuantite(
        @PathVariable Integer idBenef,
        @PathVariable Integer idIntrant,
        @RequestBody UpdateQuantiteDTO dto
) {
    intrantService.updateQuantiteIntrant(
            idBenef,
            idIntrant,
            dto.getQuantite()
    );
}


}
