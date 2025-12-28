package com.example.back.controller;

import com.example.back.model.ActionEtatView;
import com.example.back.service.ActionEtatViewService;
import org.springframework.web.bind.annotation.*;
        import java.util.List;

@RestController
@RequestMapping("/api/viewactionsetat")
public class ActionEtatViewController {

    private final ActionEtatViewService service;

    public ActionEtatViewController(ActionEtatViewService service) {
        this.service = service;
    }

    @GetMapping
    public List<ActionEtatView> getAll() {
        return service.getAll();
    }

    @GetMapping("/region/{region}")
    public List<ActionEtatView> getByRegion(@PathVariable String region) {
        return service.getByRegion(region);
    }

    @GetMapping("/etat/{etat}")
    public List<ActionEtatView> getByEtat(@PathVariable Integer etat) {
        return service.getByEtat(etat);
    }
}
