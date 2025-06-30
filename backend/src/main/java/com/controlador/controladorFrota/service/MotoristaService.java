package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.DTOs.mapper.CargaMapper;
import com.controlador.controladorFrota.DTOs.mapper.MotoristaMapper;
import com.controlador.controladorFrota.DTOs.request.MotoristaRequestDTO;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.model.Veiculo;
import com.controlador.controladorFrota.repositorys.MotoristaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public void deleteMotorista(Long id) {
        motoristaRepository.deleteById(id);
    }

    public ResponseEntity<List<Motorista>> listarMotorista(){
        return ResponseEntity.ok().body(motoristaRepository.findAll());
    }

    public Optional<Motorista> detalharMotorista(Long id) {
        return motoristaRepository.findById(id);
    }

    public List<Motorista> filtrarPorNomeMotorista(String nome) {
        return motoristaRepository.filtrarPorNomeMotorista(nome);
    }
}
