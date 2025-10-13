package com.example.back.service;

import com.example.back.model.Superviseur;
import com.example.back.repository.SuperviseurRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuperviseurService {
    private final SuperviseurRepository repository;

    public SuperviseurService(SuperviseurRepository repository) {
        this.repository = repository;
    }

    public List<Superviseur> getAll() {
        return repository.findAll();
    }

    public Superviseur getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Superviseur save(Superviseur superviseur) {
        return repository.save(superviseur);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
