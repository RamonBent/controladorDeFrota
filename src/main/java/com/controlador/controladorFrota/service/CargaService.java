package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.DTOs.mapper.CargaMapper;
import com.controlador.controladorFrota.DTOs.request.CargaRequestDTO;
import com.controlador.controladorFrota.model.Carga;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.repositorys.CargaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CargaService {
    @Autowired
    CargaRepository cargaRepository;

    @Autowired
    CargaMapper cargaMapper;

    public Carga salvaCarga(CargaRequestDTO cargaRequestDTO){
        Carga carga = cargaMapper.toEntity(cargaRequestDTO);
        return cargaRepository.save(carga);
    }

    public void deleteCarga(Long id) {
        cargaRepository.deleteById(id);
    }

    public ResponseEntity<List<Carga>> listarCarga(){
        return ResponseEntity.ok().body(cargaRepository.findAll());
    }

    public Optional<Carga> detalharCarga(Long id) {
        return cargaRepository.findById(id);
    }
}
