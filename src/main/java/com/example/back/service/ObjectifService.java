package com.example.back.service;

import com.example.back.model.Objectif;
import com.example.back.repository.ObjectifRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class ObjectifService {

    private final ObjectifRepository repository;

    public ObjectifService(ObjectifRepository repository) {
        this.repository = repository;
    }
    public List<Map<String, Object>> getAll() {
        return repository.findAllWithUnite();
    }

    public Objectif updateQuantite(Integer idObj, BigDecimal quantite) {
        Objectif obj = repository.findById(idObj)
                .orElseThrow(() -> new RuntimeException("Objectif non trouvé"));

        obj.setQuantiteObj(quantite);
        return repository.save(obj);
    }
}
