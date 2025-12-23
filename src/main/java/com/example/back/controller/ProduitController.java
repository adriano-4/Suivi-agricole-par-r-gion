package com.example.back.controller;

import com.example.back.model.AutreProduit;
import com.example.back.model.Intrant;
import com.example.back.service.ProduitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    // ---- INTRANT ----
    @GetMapping("/intrants")
    public List<Intrant> getAllIntrants() {
        return produitService.getAllIntrants();
    }

    @PostMapping("/intrants")
    public ResponseEntity<Intrant> createIntrant(@RequestParam String typeIntrant, @RequestParam Integer idUnite) {
        return ResponseEntity.ok(produitService.createIntrant(typeIntrant, idUnite));
    }

    @PutMapping("/intrants/{id}")
    public ResponseEntity<Intrant> updateIntrant(@PathVariable Integer id, @RequestParam String typeIntrant, @RequestParam Integer idUnite) {
        return ResponseEntity.ok(produitService.updateIntrant(id, typeIntrant, idUnite));
    }

    @DeleteMapping("/intrants/{id}")
    public ResponseEntity<Void> deleteIntrant(@PathVariable Integer id) {
        produitService.deleteIntrant(id);
        return ResponseEntity.noContent().build();
    }

    // ---- AUTRE PRODUIT ----
    @GetMapping("/autres-produits")
    public List<AutreProduit> getAllAutresProduits() {
        return produitService.getAllAutresProduits();
    }

    @PostMapping("/autres-produits")
    public ResponseEntity<AutreProduit> createAutreProduit(@RequestParam String typeProduit, @RequestParam Integer idUnite) {
        return ResponseEntity.ok(produitService.createAutreProduit(typeProduit, idUnite));
    }

    @PutMapping("/autres-produits/{id}")
    public ResponseEntity<AutreProduit> updateAutreProduit(@PathVariable Integer id, @RequestParam String typeProduit, @RequestParam Integer idUnite) {
        return ResponseEntity.ok(produitService.updateAutreProduit(id, typeProduit, idUnite));
    }

    @DeleteMapping("/autres-produits/{id}")
    public ResponseEntity<Void> deleteAutreProduit(@PathVariable Integer id) {
        produitService.deleteAutreProduit(id);
        return ResponseEntity.noContent().build();
    }
}
