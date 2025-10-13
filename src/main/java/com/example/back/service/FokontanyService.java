package com.example.back.service;

import com.example.back.model.Commune;
import com.example.back.model.Fokontany;
import com.example.back.repository.CommuneRepository;
import com.example.back.repository.FokontanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FokontanyService {

    @Autowired
    private FokontanyRepository fokontanyRepository;

    @Autowired
    private CommuneRepository communeRepository;

    public List<Fokontany> getAllFokontany() {
        return fokontanyRepository.findAll();
    }

    public List<Fokontany> getFokontanyByCommune(Integer communeId) {
        return fokontanyRepository.findByCommuneId(communeId);
    }

    public Fokontany saveFokontany(Integer communeId, Fokontany fokontany) {
        Commune commune = communeRepository.findById(communeId)
                .orElseThrow(() -> new RuntimeException("Commune non trouvée avec id: " + communeId));
        fokontany.setCommune(commune);
        return fokontanyRepository.save(fokontany);
    }

    public void deleteFokontany(Integer fokontanyId) {
        fokontanyRepository.deleteById(fokontanyId);
    }
}
