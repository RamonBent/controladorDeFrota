package com.controlador.controladorFrota.controller;

import com.controlador.controladorFrota.DTOs.request.MotoristaRequestDTO;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.service.MotoristaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @DeleteMapping("/deleta{id}")
    public ResponseEntity<Void> deletarMotorista(@PathVariable Long id){
        motoristaService.deleteMotorista(id); //Sem verificacao
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/lista")
    public ResponseEntity<List<Motorista>> listarMotorista(){
        return motoristaService.listarMotorista();
    }

    @GetMapping("/detalhar/{id}")
    public ResponseEntity<Motorista> detalharMotorista(@PathVariable Long id) {
        return motoristaService.detalharMotorista(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
