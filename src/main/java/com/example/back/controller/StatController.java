package com.example.back.controller;

import com.example.back.model.StatView;
import com.example.back.service.StatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statistiques")
public class StatController {

    private final StatService statService;

    public StatController(StatService statService) {
        this.statService = statService;
    }

    @GetMapping
    public List<StatView> getAllStats() {
        return statService.getAllStats();
    }

    @GetMapping("/{region}")
    public StatView getStatByRegion(@PathVariable String region) {
        return statService.getStatByRegion(region);
    }
}
