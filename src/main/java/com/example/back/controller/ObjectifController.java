package com.example.back.controller;

import com.example.back.dto.ObjectifQuantiteDTO;
import com.example.back.model.Objectif;
import com.example.back.service.ObjectifService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/objectifs")
public class ObjectifController {

    private final ObjectifService service;

    public ObjectifController(ObjectifService service) {
        this.service = service;
    }

    @GetMapping
    public List<Map<String, Object>> getAllObjectifs() {
        return service.getAll();
    }


//    @PutMapping("/{id}")
//    public Objectif updateQuantite(
//            @PathVariable Integer id,
//            @RequestBody ObjectifQuantiteDTO dto
//    ) {
//        return service.updateQuantite(id, dto.getQuantiteObj());
//    }
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateQuantite(
            @PathVariable Integer id,
            @RequestBody ObjectifQuantiteDTO dto
    ) {
        service.updateQuantite(id, dto.getQuantiteObj());
        return ResponseEntity.ok().build();
    }


}
