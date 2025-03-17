package com.controlador.controladorFrota.DTOs.mapper;

import com.controlador.controladorFrota.DTOs.request.CargaRequestDTO;
import com.controlador.controladorFrota.model.Carga;
import org.springframework.stereotype.Component;

@Component
public class CargaMapper {

    public Carga toEntity(CargaRequestDTO requestDTO){
        Carga carga = new Carga();
        carga.setOrigem(requestDTO.getOrigem());
        carga.setDistancia(requestDTO.getDistancia());
        carga.setDestino(requestDTO.getDestino());
        carga.setOrigem(requestDTO.getOrigem());
        carga.setTonelada(requestDTO.getTonelada());
        carga.setValorTonelada(requestDTO.getValorTonelada());
        return carga;
    }
}