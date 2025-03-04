package com.controlador.controladorFrota.DTOs.mapper;

import com.controlador.controladorFrota.DTOs.request.ViagemRequestDTO;
import com.controlador.controladorFrota.model.*;
import com.controlador.controladorFrota.repositorys.CargaRepository;
import com.controlador.controladorFrota.repositorys.DespesasRepository;
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

    @Autowired
    DespesasRepository despesasRepository;



//Forma abaixo foi encontrada para pode colocar apenas o id em outra tabela
    public Viagem toEntity(ViagemRequestDTO viagemRequestDTO){
        Viagem viagem = new Viagem();
        Carga carga = cargaRepository.findById(viagemRequestDTO.getCargaId()).orElse(null);
        Veiculo veiculo = veiculoRepository.findById(viagemRequestDTO.getVeiculoId()).orElse(null);
        Motorista motorista = motoristaRepository.findById(viagemRequestDTO.getMotoristaId()).orElse(null);
        Despesas despesas = despesasRepository.findById(viagemRequestDTO.getDespesasId()).orElse(null);


        // Setar as entidades no transporte
        viagem.setCarga(carga);
        viagem.setVeiculo(veiculo);
        viagem.setMotorista(motorista);
        viagem.setDespesas(despesas);

        return viagem;
    }
}
