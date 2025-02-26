package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.DTOs.mapper.CargaMapper;
import com.controlador.controladorFrota.DTOs.request.CargaRequestDTO;
import com.controlador.controladorFrota.model.Carga;
import com.controlador.controladorFrota.repositorys.CargaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    //excluir

    //buscar

    //editar
}
