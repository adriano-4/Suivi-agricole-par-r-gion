package com.example.back.service;

import com.example.back.model.AutreProduit;
import com.example.back.model.Intrant;
import com.example.back.model.Unite;
import com.example.back.repository.AutreProduitRepository;
import com.example.back.repository.IntrantRepository;
import com.example.back.repository.UniteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {

    private final IntrantRepository intrantRepo;
    private final AutreProduitRepository autreProduitRepo;
    private final UniteRepository uniteRepo;

    public ProduitService(IntrantRepository intrantRepo, AutreProduitRepository autreProduitRepo, UniteRepository uniteRepo) {
        this.intrantRepo = intrantRepo;
        this.autreProduitRepo = autreProduitRepo;
        this.uniteRepo = uniteRepo;
    }

    // --- INTRANT ---
    public List<Intrant> getAllIntrants() {
        return intrantRepo.findAll();
    }

    public Optional<Intrant> getIntrantById(Integer id) {
        return intrantRepo.findById(id);
    }

    public Intrant createIntrant(String type, Integer idUnite) {
        Unite unite = uniteRepo.findById(idUnite)
                .orElseThrow(() -> new RuntimeException("Unité introuvable"));
        Intrant intrant = new Intrant();
        intrant.setTypeIntrant(type);
        intrant.setUnite(unite);
        return intrantRepo.save(intrant);
    }

    public Intrant updateIntrant(Integer id, String type, Integer idUnite) {
        Intrant intrant = intrantRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Intrant non trouvé"));
        Unite unite = uniteRepo.findById(idUnite)
                .orElseThrow(() -> new RuntimeException("Unité introuvable"));
        intrant.setTypeIntrant(type);
        intrant.setUnite(unite);
        return intrantRepo.save(intrant);
    }

    public void deleteIntrant(Integer id) {
        intrantRepo.deleteById(id);
    }

    // --- AUTRE PRODUIT ---
    public List<AutreProduit> getAllAutresProduits() {
        return autreProduitRepo.findAll();
    }

    public Optional<AutreProduit> getAutreProduitById(Integer id) {
        return autreProduitRepo.findById(id);
    }

    public AutreProduit createAutreProduit(String type, Integer idUnite) {
        Unite unite = uniteRepo.findById(idUnite)
                .orElseThrow(() -> new RuntimeException("Unité introuvable"));
        AutreProduit produit = new AutreProduit();
        produit.setTypeProduit(type);
        produit.setUnite(unite);
        return autreProduitRepo.save(produit);
    }

    public AutreProduit updateAutreProduit(Integer id, String type, Integer idUnite) {
        AutreProduit produit = autreProduitRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        Unite unite = uniteRepo.findById(idUnite)
                .orElseThrow(() -> new RuntimeException("Unité introuvable"));
        produit.setTypeProduit(type);
        produit.setUnite(unite);
        return autreProduitRepo.save(produit);
    }

    public void deleteAutreProduit(Integer id) {
        autreProduitRepo.deleteById(id);
    }
}
