package com.example.back.controller;

import com.example.back.model.Superviseur;
import com.example.back.service.SuperviseurService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/superviseurs")
public class SuperviseurController {
    private final SuperviseurService service;

    public SuperviseurController(SuperviseurService service) {
        this.service = service;
    }

    @GetMapping
    public List<Superviseur> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Superviseur getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public Superviseur create(@RequestBody Superviseur superviseur) {
        return service.save(superviseur);
    }

    @PutMapping("/{id}")
    public Superviseur update(@PathVariable Integer id, @RequestBody Superviseur superviseur) {
        superviseur.setIdSup(id);
        return service.save(superviseur);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
