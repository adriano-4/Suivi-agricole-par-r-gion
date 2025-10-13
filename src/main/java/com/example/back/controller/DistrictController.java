package com.example.back.controller;

import com.example.back.model.District;
import com.example.back.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/districts")
@CrossOrigin(origins = "http://localhost:5173")
public class DistrictController {

    @Autowired
    private DistrictService districtService;

    @GetMapping
    public List<District> getAllDistricts() {
        return districtService.getAllDistricts();
    }

    @GetMapping("/region/{regionId}")
    public List<District> getDistrictsByRegion(@PathVariable Integer regionId) {
        return districtService.getDistrictsByRegion(regionId);
    }

    @PostMapping("/region/{regionId}")
    public District addDistrict(@PathVariable Integer regionId, @RequestBody District district) {
        return districtService.saveDistrict(regionId, district);
    }

    @DeleteMapping("/{districtId}")
    public void deleteDistrict(@PathVariable Integer districtId) {
        districtService.deleteDistrict(districtId);
    }
}
