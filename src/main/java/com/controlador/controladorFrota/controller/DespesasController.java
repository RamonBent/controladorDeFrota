package com.controlador.controladorFrota.controller;

import com.controlador.controladorFrota.DTOs.request.DespesasRequestDTO;
import com.controlador.controladorFrota.model.Despesas;
import com.controlador.controladorFrota.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
