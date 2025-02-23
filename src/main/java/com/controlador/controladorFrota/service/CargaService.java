package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.repositorys.CargaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CargaService {
    @Autowired
    CargaRepository cargaRepository;


}
