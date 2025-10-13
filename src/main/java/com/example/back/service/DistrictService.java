package com.example.back.service;

import com.example.back.model.District;
import com.example.back.model.Region;
import com.example.back.repository.DistrictRepository;
import com.example.back.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictService {

    @Autowired
    private DistrictRepository districtRepository;

    @Autowired
    private RegionRepository regionRepository;

    public List<District> getAllDistricts() {
        return districtRepository.findAll();
    }

    public District getDistrictById(Integer districtId) {
        return districtRepository.findById(districtId)
                .orElseThrow(() -> new RuntimeException("District non trouvé avec l'id: " + districtId));
    }

    public List<District> getDistrictsByRegion(Integer regionId) {
        return districtRepository.findByRegionId(regionId);
    }

    public District saveDistrict(Integer regionId, District district) {
        Region region = regionRepository.findById(regionId)
                .orElseThrow(() -> new RuntimeException("Région non trouvée"));
        district.setRegion(region);
        return districtRepository.save(district);
    }

    public void deleteDistrict(Integer districtId) {
        districtRepository.deleteById(districtId);
    }
}