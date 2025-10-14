package com.example.back.service;

import com.example.back.model.Vulgarisation;
import com.example.back.repository.VulgarisationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VulgarisationService {

    @Autowired
    private VulgarisationRepository repository;

    public Optional<Vulgarisation> getById(Integer id) {
        return repository.findById(id);
    }

    public Vulgarisation updateVulgarisation(Integer id, Vulgarisation updatedData) {
        return repository.findById(id)
                .map(vulgarisation -> {
                    vulgarisation.setNbrEafEncadre(updatedData.getNbrEafEncadre());
                    vulgarisation.setNbrPf(updatedData.getNbrPf());
                    vulgarisation.setNbrPfCep(updatedData.getNbrPfCep());
                    vulgarisation.setSuperficieCible(updatedData.getSuperficieCible());
                    vulgarisation.setOutilFormationPf(updatedData.getOutilFormationPf());
                    vulgarisation.setPlaqueIdentificationPf(updatedData.getPlaqueIdentificationPf());
                    vulgarisation.setFicheBpaSraComposte(updatedData.getFicheBpaSraComposte());
                    vulgarisation.setFicheBpPostRecolte(updatedData.getFicheBpPostRecolte());
                    return repository.save(vulgarisation);
                })
                .orElseThrow(() -> new RuntimeException("Vulgarisation non trouvée avec l'id : " + id));
    }
}
