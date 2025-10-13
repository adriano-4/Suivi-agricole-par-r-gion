package com.example.back.controller;

import com.example.back.dto.RegionDTO;
import com.example.back.model.District;
import com.example.back.model.Region;
import com.example.back.model.Regionref;
import com.example.back.repository.RegionrefRepository;
import com.example.back.service.DistrictService;
import com.example.back.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/regions")
@CrossOrigin(origins = "http://localhost:5173")
public class RegionController {

    @Autowired
    private RegionService regionService;

    @Autowired
    private RegionrefRepository regionrefRepository;
    @Autowired
    private DistrictService districtService;


    @GetMapping
    public List<Region> getAllRegions() {
        return regionService.getAllRegions();
    }

    @PostMapping
    public Region addRegion(@RequestBody RegionDTO regionDTO) {
        System.out.println("Received DTO: " + regionDTO.getNomReg() + ", " + regionDTO.getIdRegRef());

        Regionref ref = regionrefRepository.findById(regionDTO.getIdRegRef())
                .orElseThrow(() -> new RuntimeException("Région de référence non trouvée"));


        Region region = new Region();
        region.setNomReg(regionDTO.getNomReg());
        region.setRegionref(ref);

        return regionService.saveRegion(region);
    }

    /*@GetMapping("/{regionId}/districts")
    public List<District> getDistrictsByRegion(@PathVariable Integer regionId) {
        return districtService.getDistrictsByRegion(regionId);
    }*/

}
