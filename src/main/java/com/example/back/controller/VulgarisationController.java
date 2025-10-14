package com.example.back.controller;

import com.example.back.model.Vulgarisation;
import com.example.back.service.VulgarisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vulgarisation")
public class VulgarisationController {

    @Autowired
    private VulgarisationService service;

    @PutMapping("/{id}")
    public Vulgarisation updateVulgarisation(
            @PathVariable Integer id,
            @RequestBody Vulgarisation updatedVulg
    ) {
        return service.updateVulgarisation(id, updatedVulg);
    }
}
