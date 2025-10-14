package com.example.back.service;

import com.example.back.dto.ApportResponse;
import com.example.back.dto.ApportUpdateRequest;
import com.example.back.model.ApportBeneficiaire;
import com.example.back.model.Unite;
import com.example.back.repository.ApportBeneficiaireRepository;
import com.example.back.repository.UniteRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ApportBeneficiaireService {

    private final ApportBeneficiaireRepository apportRepo;
    private final UniteRepository uniteRepo;

    public ApportBeneficiaireService(ApportBeneficiaireRepository apportRepo, UniteRepository uniteRepo) {
        this.apportRepo = apportRepo;
        this.uniteRepo = uniteRepo;
    }

//    public List<ApportBeneficiaire> getApportsByBeneficiaire(Integer idBenef) {
//        return apportRepo.findByBeneficiaireId(idBenef);
//    }

    public List<ApportResponse> getApportsByBeneficiaire(Integer idBenef) {
        return apportRepo.findByBeneficiaireId(idBenef)
                .stream()
                .map(apport -> {
                    ApportResponse dto = new ApportResponse();
                    dto.setId(apport.getIdApport());
                    dto.setTypeApport(apport.getTypeApport());

                    dto.setQuantite(apport.getQuantite() != null ? apport.getQuantite().doubleValue() : null);

                    if (apport.getUnite() != null) {
                        dto.setIdUnite(apport.getUnite().getIdUnite());
                        dto.setUniteMesure(apport.getUnite().getUniteMesure());
                    } else {
                        dto.setIdUnite(null);
                        dto.setUniteMesure(null);
                    }

                    return dto;
                })
                .toList();
    }





    public ApportBeneficiaire updateApport(Integer id, ApportUpdateRequest request) {
        ApportBeneficiaire apport = apportRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Apport introuvable avec l'id : " + id));

        if (request.getTypeApport() != null)
            apport.setTypeApport(request.getTypeApport());

        if (request.getQuantite() != null)
            apport.setQuantite(BigDecimal.valueOf(request.getQuantite()));

        if (request.getIdUnite() != null) {
            Unite unite = uniteRepo.findById(request.getIdUnite())
                    .orElseThrow(() -> new RuntimeException("Unité non trouvée"));
            apport.setUnite(unite);
        }

        return apportRepo.save(apport);
    }
}
