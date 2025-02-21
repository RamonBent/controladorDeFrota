package com.controlador.controladorFrota.controller;

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
    public ResponseEntity <Viagem> salvarViagem(@RequestBody Viagem viagem){
        Viagem viagemSalva = viagemService.salvarviagem(viagem);

        return new ResponseEntity<>(viagemSalva, HttpStatus.CREATED);
    }
}
