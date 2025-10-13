package com.example.back.controller;

import com.example.back.model.Unite;
import com.example.back.repository.UniteRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/unites")
public class UniteController {

    private final UniteRepository uniteRepo;

    public UniteController(UniteRepository uniteRepo) {
        this.uniteRepo = uniteRepo;
    }

    @GetMapping
    public List<Unite> getAllUnites() {
        return uniteRepo.findAll();
    }
}
