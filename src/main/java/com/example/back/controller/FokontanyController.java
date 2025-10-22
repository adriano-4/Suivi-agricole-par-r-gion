package com.example.back.controller;

import com.example.back.model.Fokontany;
import com.example.back.service.FokontanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fokontany")
@CrossOrigin(origins = "http://localhost:5173")
public class FokontanyController {

    @Autowired
    private FokontanyService fokontanyService;

    @GetMapping
    public List<Fokontany> getAllFokontany() {
        return fokontanyService.getAllFokontany();
    }

    @GetMapping("/commune/{communeId}")
    public List<Fokontany> getFokontanyByCommune(@PathVariable Integer communeId) {
        return fokontanyService.getFokontanyByCommune(communeId);
    }

    @PostMapping("/commune/{communeId}")
    public Fokontany addFokontany(@PathVariable Integer communeId, @RequestBody Fokontany fokontany) {
        return fokontanyService.saveFokontany(communeId, fokontany);
    }

    @DeleteMapping("/{fokontanyId}")
    public void deleteFokontany(@PathVariable Integer fokontanyId) {
        fokontanyService.deleteFokontany(fokontanyId);
    }

    @PutMapping("/{fokontanyId}")
    public Fokontany updateFokontany(@PathVariable Integer fokontanyId, @RequestBody Fokontany updatedFokontany) {
        return fokontanyService.updateFokontany(fokontanyId, updatedFokontany);
    }

}
