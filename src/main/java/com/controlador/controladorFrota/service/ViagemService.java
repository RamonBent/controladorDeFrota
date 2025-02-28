package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.DTOs.mapper.ViagemMapper;
import com.controlador.controladorFrota.DTOs.request.ViagemRequestDTO;
import com.controlador.controladorFrota.model.Viagem;
import com.controlador.controladorFrota.repositorys.CargaRepository;
import com.controlador.controladorFrota.repositorys.ViagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ViagemService {
    @Autowired
    ViagemRepository viagemRepository;

    @Autowired
    ViagemMapper viagemMapper;

    public Viagem salvarviagem(Viagem viagem){
        return viagemRepository.save(viagem) ;
    }

    public Viagem salvarViagemm(ViagemRequestDTO viagemRequestDTO){
        Viagem viagem = viagemMapper.toEntity(viagemRequestDTO);
        return viagemRepository.save(viagem);
    }
}
