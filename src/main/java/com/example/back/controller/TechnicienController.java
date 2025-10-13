package com.example.back.controller;

import com.example.back.model.Technicien;
import com.example.back.service.TechnicienService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/techniciens")
public class TechnicienController {
    private final TechnicienService service;

    public TechnicienController(TechnicienService service) {
        this.service = service;
    }

    @GetMapping
    public List<Technicien> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Technicien getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public Technicien create(@RequestBody Technicien technicien) {
        return service.save(technicien);
    }

    @PutMapping("/{id}")
    public Technicien update(@PathVariable Integer id, @RequestBody Technicien technicien) {
        technicien.setIdTech(id);
        return service.save(technicien);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
