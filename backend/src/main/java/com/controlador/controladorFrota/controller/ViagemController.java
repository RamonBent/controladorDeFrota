package com.controlador.controladorFrota.controller;

import com.controlador.controladorFrota.DTOs.request.ViagemRequestDTO;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.model.Viagem;
import com.controlador.controladorFrota.service.ViagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/viagem")
public class ViagemController {
    @Autowired
    private ViagemService viagemService;

    @PostMapping
    public ResponseEntity <Viagem> salvarViagem(@RequestBody ViagemRequestDTO viagemRequestDTO){
        Viagem viagemSalva = viagemService.salvarViagemm(viagemRequestDTO);

        return new ResponseEntity<>(viagemSalva, HttpStatus.CREATED);
    }
    @DeleteMapping("/deleta")
    public ResponseEntity<Void> deletarViagem(@PathVariable Long id){
        viagemService.deleteViagem(id); //Sem verificacao
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/lista")
    public ResponseEntity<List<Viagem>> listarViagem(){
        return viagemService.listarViagem();
    }

    @GetMapping("/detalhar/{id}")
    public ResponseEntity<Viagem> detalharViagem(@PathVariable Long id) {
        return viagemService.detalharViagem(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}