package com.controlador.controladorFrota.DTOs.mapper;

import com.controlador.controladorFrota.DTOs.request.DespesasRequestDTO;
import com.controlador.controladorFrota.model.Despesas;
import org.springframework.stereotype.Component;

@Component
public class DespesasMapper {
    public Despesas toEntity (DespesasRequestDTO despesasRequestDTO){
        Despesas despesas = new Despesas();
        despesas.setCombustivel(despesasRequestDTO.getCombustivel());
        despesas.setManutencao(despesasRequestDTO.getManutencao());
        despesas.setOutros(despesasRequestDTO.getOutros());
        return despesas;
    }

}