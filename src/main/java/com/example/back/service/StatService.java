package com.example.back.service;

import com.example.back.model.StatView;
import com.example.back.repository.StatRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StatService {

    private final StatRepository statRepository;

    public StatService(StatRepository statRepository) {
        this.statRepository = statRepository;
    }

    public List<StatView> getAllStats() {
        return statRepository.findAllStats();
    }

    public StatView getStatByRegion(String region) {
        return statRepository.findByRegion(region);
    }
}
