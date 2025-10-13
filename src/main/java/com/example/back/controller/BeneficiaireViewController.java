package com.example.back.controller;

import com.example.back.model.BeneficiaireView;
import com.example.back.service.BeneficiaireViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiairesview")
public class BeneficiaireViewController {

    @Autowired
    private BeneficiaireViewService service;

//    @GetMapping
//    public List<BeneficiaireView> getAll() {
//        return service.getAll();
//    }

    @GetMapping
    public List<BeneficiaireView> getAllOrByRegion(@RequestParam(required = false) String nomReg) {
        if (nomReg != null && !nomReg.isEmpty()) {
            return service.getByRegion(nomReg);
        } else {
            return service.getAll();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<BeneficiaireView> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<BeneficiaireView> search(@RequestParam("q") String q) {
        return service.searchByNom(q);
    }
}
