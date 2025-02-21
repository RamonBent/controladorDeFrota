package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.repositorys.CargaRepository;
import com.controlador.controladorFrota.repositorys.ViagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ViagemService {
    @Autowired
    ViagemRepository viagemRepository;


}
