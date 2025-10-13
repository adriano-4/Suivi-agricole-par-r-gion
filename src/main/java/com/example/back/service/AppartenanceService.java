package com.example.back.service;

import com.example.back.model.Appartenance;
import com.example.back.model.Fokontany;
import com.example.back.repository.AppartenanceRepository;
import com.example.back.repository.FokontanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppartenanceService {

    private final AppartenanceRepository appartenanceRepo;

    @Autowired
    private FokontanyRepository fokontanyRepository;

    public AppartenanceService(AppartenanceRepository appartenanceRepo) {
        this.appartenanceRepo = appartenanceRepo;
    }

    public List<Appartenance> getAll() {
        return appartenanceRepo.findAll();
    }

    public Optional<Appartenance> getById(Integer id) {
        return appartenanceRepo.findById(id);
    }

    public Appartenance save(Appartenance appartenance) {
        return appartenanceRepo.save(appartenance);
    }

    public void delete(Integer id) {
        appartenanceRepo.deleteById(id);
    }

    public List<Appartenance> getByFokontanyId(Integer fokontanyId) {
        return appartenanceRepo.findByFokontany_IdFok(fokontanyId);
    }



    public Appartenance saveAppartenance(Integer fokontanyId, Appartenance appartenance) {
        Fokontany fok = fokontanyRepository.findById(fokontanyId)
                .orElseThrow(() -> new RuntimeException("Fokontany introuvable"));
        appartenance.setFokontany(fok);
        return appartenanceRepo.save(appartenance);
    }

    public List<Appartenance> getAppartenancesByRegion(Integer regionId) {
        return appartenanceRepo.findAppartenancesByRegionIdNative(regionId);
    }

}
