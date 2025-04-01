package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.DTOs.mapper.DespesasMapper;
import com.controlador.controladorFrota.DTOs.request.DespesasRequestDTO;
import com.controlador.controladorFrota.model.Despesas;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.repositorys.DespesasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

        BigDecimal despesaTotal = calculaDespesaTotal(despesasRequestDTO);
        despesas.setTotalDespesas(despesaTotal);

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

    private BigDecimal calculaDespesaTotal (DespesasRequestDTO despesasRequestDTO){
        BigDecimal totalDespesa = BigDecimal.ZERO;
        //Se alguma despesa estiver null retorna nullexcepition
        totalDespesa = totalDespesa.add(despesasRequestDTO.getCombustivel())
                .add(despesasRequestDTO.getManutencao())
                .add(despesasRequestDTO.getOutros());
        return totalDespesa;
    }

}
