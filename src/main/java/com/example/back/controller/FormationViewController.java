package com.example.back.controller;

import com.example.back.model.FormationView;
import com.example.back.service.FormationViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/formationsview")
public class FormationViewController {

    @Autowired
    private FormationViewService service;

    @GetMapping
    public List<FormationView> getFormations(@RequestParam(value = "nomReg", required = false) String nomReg) {
        if (nomReg != null && !nomReg.trim().isEmpty()) {
            return service.getFormationsByRegion(nomReg.trim());
        } else {
            return service.getAllFormations();
        }
    }
}
