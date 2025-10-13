package com.example.back.service;

import com.example.back.model.ResponsableMagasin;
import com.example.back.repository.ResponsableMagasinRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponsableMagasinService {
    private final ResponsableMagasinRepository repository;

    public ResponsableMagasinService(ResponsableMagasinRepository repository) {
        this.repository = repository;
    }

    public List<ResponsableMagasin> getAll() {
        return repository.findAll();
    }

    public ResponsableMagasin getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public ResponsableMagasin save(ResponsableMagasin resp) {
        return repository.save(resp);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
