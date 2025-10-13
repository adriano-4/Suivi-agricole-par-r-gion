package com.example.back.controller;

import com.example.back.dto.UserRequest;
import com.example.back.model.Region;
import com.example.back.model.Role;
import com.example.back.model.User;
import com.example.back.repository.RegionRepository;
import com.example.back.repository.RoleRepository;
import com.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users_region")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private RoleRepository roleRepository;

//    @PostMapping("/addRegionUser")
//    public ResponseEntity<?> addRegionUser(@RequestBody UserRequest request) {
//        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
//            return ResponseEntity.badRequest().body("username required");
//        }
//        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
//            return ResponseEntity.badRequest().body("password required");
//        }
//        if (request.getRegionId() == null) {
//            return ResponseEntity.badRequest().body("regionId required");
//        }
//
//        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
//            return ResponseEntity.badRequest().body("Nom d'utilisateur déjà utilisé");
//        }
//
//        Region region = regionRepository.findById(request.getRegionId())
//                .orElseThrow(() -> new RuntimeException("Région introuvable"));
//
//        Role roleRegion = roleRepository.findByName("ROLE_REGION")
//                .orElseThrow(() -> new RuntimeException("Role REGION introuvable"));
//        if (roleRegion == null) {
//            return ResponseEntity.badRequest().body("Role REGION introuvable");
//        }
//
//        User user = new User();
//        user.setUsername(request.getUsername());
//        user.setPassword(request.getPassword());
//        user.setRole(roleRegion);
//        //user.setRegion(region);
//
//        if (request.getRegionId() != null) {
//            Region region = regionRepository.findById(request.getRegionId())
//                    .orElseThrow(() -> new RuntimeException("Région introuvable"));
//            user.setRegion(region);
//        } else {
//            user.setRegion(null);
//        }
//
//        User saved = userRepository.save(user);
//
//        //saved.setPassword(null);
//
//        return ResponseEntity.ok(saved);
//    }

    @PostMapping("/addRegionUser")
    public ResponseEntity<?> addRegionUser(@RequestBody UserRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("username required");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("password required");
        }

        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Nom d'utilisateur déjà utilisé");
        }

        Role roleRegion = roleRepository.findByName("ROLE_REGION")
                .orElseThrow(() -> new RuntimeException("Role REGION introuvable"));

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole(roleRegion);

        if (request.getRegionId() != null) {
            Region region = regionRepository.findById(request.getRegionId())
                    .orElseThrow(() -> new RuntimeException("Région introuvable"));
            user.setRegion(region);
        } else {
            user.setRegion(null);
        }

        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }


//    @PutMapping("/updateRegionUser/{id}")
//    public ResponseEntity<?> updateRegionUser(@PathVariable Integer id, @RequestBody UserRequest request) {
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
//
//        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
//            return ResponseEntity.badRequest().body("username required");
//        }
//        if (!user.getUsername().equals(request.getUsername()) &&
//                userRepository.findByUsername(request.getUsername()).isPresent()) {
//            return ResponseEntity.badRequest().body("Nom d'utilisateur déjà utilisé");
//        }
//
//        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
//            user.setPassword(request.getPassword());
//        }
//
//        if (request.getRegionId() == null) {
//            return ResponseEntity.badRequest().body("regionId required");
//        }
//        Region region = regionRepository.findById(request.getRegionId())
//                .orElseThrow(() -> new RuntimeException("Région introuvable"));
//
//        Role roleRegion = roleRepository.findByName("ROLE_REGION")
//                .orElseThrow(() -> new RuntimeException("Role REGION introuvable"));
//
//        user.setUsername(request.getUsername());
//        user.setRole(roleRegion);
//        user.setRegion(region);
//
//        User updated = userRepository.save(user);
//
//        //updated.setPassword(null);
//
//        return ResponseEntity.ok(updated);
//    }

    @PutMapping("/updateRegionUser/{id}")
    public ResponseEntity<?> updateRegionUser(@PathVariable Integer id, @RequestBody UserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("username required");
        }
        if (!user.getUsername().equals(request.getUsername()) &&
                userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Nom d'utilisateur déjà utilisé");
        }

        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            user.setPassword(request.getPassword());
        }

        user.setUsername(request.getUsername());

        if (request.getRegionId() != null) {
            // Utilisateur Région
            Region region = regionRepository.findById(request.getRegionId())
                    .orElseThrow(() -> new RuntimeException("Région introuvable"));
            user.setRegion(region);

            Role roleRegion = roleRepository.findByName("ROLE_REGION")
                    .orElseThrow(() -> new RuntimeException("Role REGION introuvable"));
            user.setRole(roleRegion);

        } else {
            user.setRegion(null);
            Role roleAdmin = roleRepository.findByName("ROLE_ADMIN")
                    .orElseThrow(() -> new RuntimeException("Role ADMIN introuvable"));
            user.setRole(roleAdmin);
        }

        User updated = userRepository.save(user);
        return ResponseEntity.ok(updated);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/region/{regionId}")
    public ResponseEntity<?> getUserByRegion(@PathVariable Integer regionId) {
        User user = userRepository.findByRegionId(regionId)
                .orElse(null);
        /*if (user != null) {
            user.setPassword(null);
        }*/
        return ResponseEntity.ok(user);
    }
}
