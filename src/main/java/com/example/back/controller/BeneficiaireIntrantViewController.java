package com.example.back.controller;

import com.example.back.model.BeneficiaireIntrantView;
import com.example.back.service.BeneficiaireIntrantViewService;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/beneficiairesIntrantsView")
public class BeneficiaireIntrantViewController {

    private final BeneficiaireIntrantViewService service;

    public BeneficiaireIntrantViewController(BeneficiaireIntrantViewService service) {
        this.service = service;
    }

    @GetMapping
    public List<BeneficiaireIntrantView> getAll() {
        return service.getAll();
    }

    @GetMapping("/region/{region}")
    public List<BeneficiaireIntrantView> getByRegion(@PathVariable String region) {
        return service.getByRegion(region);
    }
}
