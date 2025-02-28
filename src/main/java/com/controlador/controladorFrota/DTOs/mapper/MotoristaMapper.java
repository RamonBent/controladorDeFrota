package com.controlador.controladorFrota.DTOs.mapper;

import com.controlador.controladorFrota.DTOs.request.MotoristaRequestDTO;
import com.controlador.controladorFrota.model.Motorista;
import org.springframework.stereotype.Component;

@Component
public class MotoristaMapper {

    public Motorista toEntity(MotoristaRequestDTO motoristaRequestDTO){
        Motorista motorista = new Motorista();
        motorista.setNome(motoristaRequestDTO.getNome());
        motorista.setDataNasc(motoristaRequestDTO.getDataNasc());
        return motorista;
    }
}
