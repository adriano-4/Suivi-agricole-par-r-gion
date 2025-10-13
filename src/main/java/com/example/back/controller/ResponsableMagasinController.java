package com.example.back.controller;

import com.example.back.model.ResponsableMagasin;
import com.example.back.service.ResponsableMagasinService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/responsables")
public class ResponsableMagasinController {
    private final ResponsableMagasinService service;

    public ResponsableMagasinController(ResponsableMagasinService service) {
        this.service = service;
    }

    @GetMapping
    public List<ResponsableMagasin> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponsableMagasin getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @PostMapping
    public ResponsableMagasin create(@RequestBody ResponsableMagasin resp) {
        return service.save(resp);
    }

    @PutMapping("/{id}")
    public ResponsableMagasin update(@PathVariable Integer id, @RequestBody ResponsableMagasin resp) {
        resp.setIdResp(id);
        return service.save(resp);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
