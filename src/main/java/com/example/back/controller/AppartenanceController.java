package com.example.back.controller;

import com.example.back.model.Appartenance;
import com.example.back.service.AppartenanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appartenances")
public class AppartenanceController {

    private final AppartenanceService service;

    public AppartenanceController(AppartenanceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Appartenance> getAllAppartenances() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Appartenance> getAppartenanceById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public Appartenance addAppartenance(@RequestBody Appartenance appartenance) {
        return service.save(appartenance);
    }

    @PutMapping("/{id}")
    public Appartenance updateAppartenance(@PathVariable Integer id, @RequestBody Appartenance updatedAppartenance) {
        Optional<Appartenance> existing = service.getById(id);
        if (existing.isPresent()) {
            Appartenance appartenance = existing.get();
            appartenance.setNomAppartenance(updatedAppartenance.getNomAppartenance());
            appartenance.setFokontany(updatedAppartenance.getFokontany());
            return service.save(appartenance);
        } else {
            throw new RuntimeException("Appartenance introuvable avec id : " + id);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteAppartenance(@PathVariable Integer id) {
        service.delete(id);
    }

    @GetMapping("/fokontany/{fokontanyId}")
    public List<Appartenance> getAppartenancesByFokontany(@PathVariable Integer fokontanyId) {
        return service.getByFokontanyId(fokontanyId);
    }

    @PostMapping("/fokontany/{fokontanyId}")
    public Appartenance addAppartenanceToFokontany(
            @PathVariable Integer fokontanyId,
            @RequestBody Appartenance appartenance) {
        return service.saveAppartenance(fokontanyId, appartenance);
    }

    @GetMapping("/region/{id}")
    public ResponseEntity<List<Appartenance>> getAppartenanceByRegion(@PathVariable("id") Integer regionId) {
        List<Appartenance> list = service.getAppartenancesByRegion(regionId);
        return ResponseEntity.ok(list);
    }


}
