package com.example.back.controller;

import com.example.back.dto.LoginRequest;
import com.example.back.dto.LoginResponse;
import com.example.back.model.User;
import com.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        String role = user.getRole().getName();

        String region = null;
        if ("ROLE_REGION".equalsIgnoreCase(role) && user.getRegion() != null) {
            region = user.getRegion().getNomReg();
        }

        String fakeToken = "FAKE_TOKEN_" + user.getId();

        return new LoginResponse(fakeToken, role, region);
    }

}
