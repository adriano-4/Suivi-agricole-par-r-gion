package com.example.back.service;

import com.example.back.dto.BeneficiaireIntrantDTO;
import com.example.back.repository.BeneficiaireIntrantRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class BeneficiaireIntrantService {

    private final BeneficiaireIntrantRepository repo;

    public BeneficiaireIntrantService(BeneficiaireIntrantRepository repo) {
        this.repo = repo;
    }

    public List<BeneficiaireIntrantDTO> getIntrantsByBeneficiaire(Integer idBenef) {
        return repo.findIntrantsByBeneficiaire(idBenef);
    }

    public void updateQuantiteIntrant(
            Integer idBenef,
            Integer idIntrant,
            BigDecimal quantite
    ) {
        int updated = repo.updateQuantite(idBenef, idIntrant, quantite);

        if (updated == 0) {
            throw new RuntimeException(
                    "Intrant non trouvé pour ce bénéficiaire"
            );
        }
    }
}
