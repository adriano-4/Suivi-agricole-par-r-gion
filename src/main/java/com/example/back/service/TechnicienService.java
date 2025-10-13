package com.example.back.service;

import com.example.back.model.Technicien;
import com.example.back.repository.TechnicienRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnicienService {
    private final TechnicienRepository repository;

    public TechnicienService(TechnicienRepository repository) {
        this.repository = repository;
    }

    public List<Technicien> getAll() {
        return repository.findAll();
    }

    public Technicien getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Technicien save(Technicien technicien) {
        return repository.save(technicien);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
