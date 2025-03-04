package com.controlador.controladorFrota.controller;

import com.controlador.controladorFrota.DTOs.request.MotoristaRequestDTO;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.service.MotoristaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/motorista")
public class MotoristaController {
    @Autowired
    MotoristaService motoristaService;

    @PostMapping("/cria")
    public ResponseEntity<Motorista> criaMotorista (@RequestBody MotoristaRequestDTO motoristaRequestDTO){
        Motorista motorista = motoristaService.salvaMotorista(motoristaRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(motorista);
    }


}
