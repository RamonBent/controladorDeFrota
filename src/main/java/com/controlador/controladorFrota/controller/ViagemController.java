package com.controlador.controladorFrota.controller;

import com.controlador.controladorFrota.DTOs.request.ViagemRequestDTO;
import com.controlador.controladorFrota.model.Viagem;
import com.controlador.controladorFrota.service.ViagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
