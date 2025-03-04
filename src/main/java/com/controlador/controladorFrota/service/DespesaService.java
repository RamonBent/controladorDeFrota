package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.DTOs.mapper.DespesasMapper;
import com.controlador.controladorFrota.DTOs.request.DespesasRequestDTO;
import com.controlador.controladorFrota.model.Despesas;
import com.controlador.controladorFrota.repositorys.DespesasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
