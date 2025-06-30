package com.controlador.controladorFrota.controller;

import com.controlador.controladorFrota.DTOs.request.DespesasRequestDTO;
import com.controlador.controladorFrota.model.Despesas;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(name = "/despesas")
public class DespesasController {
    @Autowired
    DespesaService despesaService;

    @PostMapping("/cria-despesa")
    public ResponseEntity<Despesas> criaDespesas (@RequestBody DespesasRequestDTO despesasRequestDTO){
        Despesas despesas = despesaService.salvaDespesa(despesasRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(despesas);
    }

    @DeleteMapping("/deleta")
    public ResponseEntity<Void> deletaDespesas (Long id){
        despesaService.deleteDespesas(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/lista")
    public ResponseEntity<List<Despesas>> listarDespesas(){
        return despesaService.listarDespesas();
    }

    @GetMapping("/detalha/{id}")
    public ResponseEntity<Despesas> detalharDespesas(@PathVariable Long id) {
        return despesaService.detalharDespesas(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}