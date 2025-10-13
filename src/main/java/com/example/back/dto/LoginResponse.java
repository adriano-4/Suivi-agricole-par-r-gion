package com.example.back.dto;

public class LoginResponse {
    private String token;
    private String role;
    private String region;

    public LoginResponse() {}

    public LoginResponse(String token, String role, String region) {
        this.token = token;
        this.role = role;
        this.region = region;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
}
