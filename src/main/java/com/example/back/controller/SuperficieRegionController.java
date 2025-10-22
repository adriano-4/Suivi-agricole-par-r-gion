package com.example.back.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.back.model.SuperficieRegion;
import com.example.back.service.SuperficieRegionService;

@RestController
@RequestMapping("/api/superficieRegion")
public class SuperficieRegionController {

    @Autowired
    private com.example.back.service.SuperficieRegionService superficieRegionService;

    @GetMapping
    public List<SuperficieRegion> getSuperficieParRegion() {
        return superficieRegionService.getAllSuperficies();
    }
}
