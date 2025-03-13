package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.DTOs.mapper.DespesasMapper;
import com.controlador.controladorFrota.DTOs.request.DespesasRequestDTO;
import com.controlador.controladorFrota.model.Despesas;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.repositorys.DespesasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {
    @Autowired
    DespesasRepository despesasRepository;

    @Autowired
    DespesasMapper despesasMapper;

    public Despesas salvaDespesa(DespesasRequestDTO despesasRequestDTO){
        Despesas despesas = despesasMapper.toEntity(despesasRequestDTO);
        return despesasRepository.save(despesas);
    }

    public void deleteDespesas(Long id){
        despesasRepository.deleteById(id);
    }

    public ResponseEntity<List<Despesas>> listarDespesas(){
        return ResponseEntity.ok().body(despesasRepository.findAll());
    }

    public Optional<Despesas> detalharDespesas(Long id) {
        return despesasRepository.findById(id);
    }

}
