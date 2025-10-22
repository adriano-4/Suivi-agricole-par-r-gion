package com.example.back.service;

import com.example.back.model.Commune;
import com.example.back.model.District;
import com.example.back.repository.CommuneRepository;
import com.example.back.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommuneService {

    @Autowired
    private CommuneRepository communeRepository;

    @Autowired
    private DistrictRepository districtRepository;

    public List<Commune> getAllCommunes() {
        return communeRepository.findAll();
    }

    public List<Commune> getCommunesByDistrict(Integer districtId) {
        return communeRepository.findByDistrictIdDist(districtId);
    }

    public Commune saveCommune(Integer districtId, Commune commune) {
        District dist = districtRepository.findById(districtId)
                .orElseThrow(() -> new RuntimeException("District introuvable"));
        commune.setDistrict(dist);
        return communeRepository.save(commune);
    }

    public void deleteCommune(Integer communeId) {
        communeRepository.deleteById(communeId);
    }
    public Commune updateCommune(Integer communeId, Commune updatedCommune) {
        Commune existingCommune = communeRepository.findById(communeId)
                .orElseThrow(() -> new RuntimeException("Commune non trouvée avec l'id: " + communeId));

        existingCommune.setNomComm(updatedCommune.getNomComm());

        if (updatedCommune.getDistrict() != null) {
            existingCommune.setDistrict(updatedCommune.getDistrict());
        }

        return communeRepository.save(existingCommune);
    }

}
