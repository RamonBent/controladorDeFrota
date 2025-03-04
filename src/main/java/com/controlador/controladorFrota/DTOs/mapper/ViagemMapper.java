package com.controlador.controladorFrota.DTOs.mapper;

import com.controlador.controladorFrota.DTOs.request.ViagemRequestDTO;
import com.controlador.controladorFrota.model.Carga;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.model.Veiculo;
import com.controlador.controladorFrota.model.Viagem;
import com.controlador.controladorFrota.repositorys.CargaRepository;
import com.controlador.controladorFrota.repositorys.MotoristaRepository;
import com.controlador.controladorFrota.repositorys.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ViagemMapper {
    @Autowired
    CargaRepository cargaRepository;

    @Autowired
    VeiculoRepository veiculoRepository;

    @Autowired
    MotoristaRepository motoristaRepository;

    public Viagem toEntity(ViagemRequestDTO viagemRequestDTO){
        Viagem viagem = new Viagem();
        Carga carga = cargaRepository.findById(viagemRequestDTO.getCargaId()).orElse(null);
        Veiculo veiculo = veiculoRepository.findById(viagemRequestDTO.getVeiculoId()).orElse(null);
        Motorista motorista = motoristaRepository.findById(viagemRequestDTO.getMotoristaId()).orElse(null);


        // Setar as entidades no transporte
        viagem.setCarga(carga);
        viagem.setVeiculo(veiculo);
        viagem.setMotorista(motorista);

        return viagem;
    }
}
