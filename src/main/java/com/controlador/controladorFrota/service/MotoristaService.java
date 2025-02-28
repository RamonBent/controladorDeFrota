package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.DTOs.mapper.CargaMapper;
import com.controlador.controladorFrota.DTOs.mapper.MotoristaMapper;
import com.controlador.controladorFrota.DTOs.request.MotoristaRequestDTO;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.repositorys.MotoristaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MotoristaService {
    @Autowired
    MotoristaRepository motoristaRepository;

    @Autowired
    MotoristaMapper motoristaMapper;

    public Motorista salvaMotorista (MotoristaRequestDTO motoristaRequestDTO){
        Motorista motorista = motoristaMapper.toEntity(motoristaRequestDTO);
        return motoristaRepository.save(motorista);
    }
}
