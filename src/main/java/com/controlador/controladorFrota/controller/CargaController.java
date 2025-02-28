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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/caega")
public class CargaController {

    @Autowired
    private CargaService cargaService;

    @Autowired
    private MotoristaService motoristaService;

    @PostMapping("cria-carga")
    public ResponseEntity<Carga> criaCarga(@RequestBody CargaRequestDTO cargaRequestDTO){
        Carga criaCarga = cargaService.salvaCarga(cargaRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(criaCarga);
    }

    @PostMapping("/Cria")
    public ResponseEntity<Motorista> criaMotorista (@RequestBody MotoristaRequestDTO motoristaRequestDTO){
        System.out.println("DTO recebido: " + motoristaRequestDTO);
        Motorista motorista = motoristaService.salvaMotorista(motoristaRequestDTO);
        System.out.println("Motorista antes de salvar: " + motorista);
        return ResponseEntity.status(HttpStatus.CREATED).body(motorista);
    }
}
