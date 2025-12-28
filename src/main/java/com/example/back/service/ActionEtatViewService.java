package com.example.back.service;

import com.example.back.model.ActionEtatView;
import com.example.back.repository.ActionEtatViewRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActionEtatViewService {

    private final ActionEtatViewRepository repository;

    public ActionEtatViewService(ActionEtatViewRepository repository) {
        this.repository = repository;
    }

    public List<ActionEtatView> getAll() {
        return repository.findAll();
    }

    public List<ActionEtatView> getByRegion(String region) {
        return repository.findByRegion(region);
    }

    public List<ActionEtatView> getByEtat(Integer etat) {
        return repository.findByEtat(etat);
    }
}
