package com.controlador.controladorFrota.controller;

import com.controlador.controladorFrota.DTOs.request.CargaRequestDTO;
import com.controlador.controladorFrota.DTOs.request.MotoristaRequestDTO;
import com.controlador.controladorFrota.model.Carga;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.model.Veiculo;
import com.controlador.controladorFrota.service.CargaService;
import com.controlador.controladorFrota.service.MotoristaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carga")
public class CargaController {

    @Autowired
    private CargaService cargaService;


    @PostMapping("cria")
    public ResponseEntity<Carga> criaCarga(@RequestBody CargaRequestDTO cargaRequestDTO){
        Carga criaCarga = cargaService.salvaCarga(cargaRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(criaCarga);
    }
    @DeleteMapping("/deleta/{id}")
    public ResponseEntity<Void> deletaCarga(@PathVariable Long id){
        cargaService.deleteCarga(id); //Sem verificacao
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/lista")
    public ResponseEntity<List<Carga>> listarCarga(){
        return cargaService.listarCarga();
    }

    @GetMapping("/detalhar/{id}")
    public ResponseEntity<Carga> detalharDespesas(@PathVariable Long id) {
        return cargaService.detalharCarga(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
