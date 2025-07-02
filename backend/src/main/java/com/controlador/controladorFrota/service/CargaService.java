package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.DTOs.mapper.CargaMapper;
import com.controlador.controladorFrota.DTOs.request.CargaRequestDTO;
import com.controlador.controladorFrota.model.Carga;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.repositorys.CargaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class CargaService {
    @Autowired
    CargaRepository cargaRepository;

    @Autowired
    CargaMapper cargaMapper;

    public Carga salvaCarga(CargaRequestDTO cargaRequestDTO){
        Carga carga = cargaMapper.toEntity(cargaRequestDTO);

        // Calcula o valor total do frete
        BigDecimal valorTotalFrete = calcularValorTotalFrete(carga);
        carga.setValorTotalFrete(valorTotalFrete);

        return cargaRepository.save(carga);
    }

    private BigDecimal calcularValorTotalFrete(Carga carga) {
        if (carga.getValorTonelada() != null && carga.getTonelada() > 0) {
            return carga.getValorTonelada().multiply(BigDecimal.valueOf(carga.getTonelada()));
        }
        return BigDecimal.ZERO;
    }

    public void deleteCarga(Long id) {
        cargaRepository.deleteById(id);
    }

    public ResponseEntity<List<Carga>> listarCarga(){
        return ResponseEntity.ok().body(cargaRepository.findAll());
    }

    public Optional<Carga> detalharCarga(Long id) {
        return cargaRepository.findById(id);
    }

    public List<Carga> filtrarPorDestino(String destino) {
        return cargaRepository.filtrarPorDestino(destino);
    }

    public List<Carga> filtrarPorOrigem(String origem) {
        return cargaRepository.filtrarPorOrigem(origem);
    }

    //Testado em outras condições
//    public List<Carga> buscarCargasComFreteAcimaDe(BigDecimal valorMinimo) {
//        return cargaRepository.findByValorTotalFreteMaiorQue(valorMinimo);
//    }
}
