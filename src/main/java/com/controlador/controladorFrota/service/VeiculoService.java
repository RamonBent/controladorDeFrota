package com.controlador.controladorFrota.service;

import com.controlador.controladorFrota.DTOs.mapper.VeiculoMapper;
import com.controlador.controladorFrota.DTOs.request.VeiculoRequestDTO;
import com.controlador.controladorFrota.DTOs.response.VeiculoResponseDTO;
import com.controlador.controladorFrota.model.Veiculo;
import com.controlador.controladorFrota.repositorys.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VeiculoService {
    @Autowired
    private VeiculoRepository veiculoRepository;
    @Autowired
    private VeiculoMapper veiculoMapper;

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Dessa forma retorna todo o veiculo ou seja todos atributos o ideal é usar o reponseDTO, para retornar só oque quero
//    public List<Veiculo> getAllVeiculos() {
//        return veiculoRepository.findAll();
//    }
//
//
//
//    public Optional<Veiculo> getVeiculoById(Long id) {
//        return veiculoRepository.findById(id);
//    }
//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



    //Nesses dois casos abaixo retorna so oque quero... com mapper
    public List<VeiculoResponseDTO> getAllVeiculos() {
        return veiculoRepository.findAll().stream()
                .map(veiculoMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<VeiculoResponseDTO> getVeiculoById(Long id) {
        return veiculoRepository.findById(id)
                .map(veiculoMapper::toResponseDTO);
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //Para criar veiculo sem DTO
    public Veiculo createVeiculo(Veiculo veiculo) {
        return veiculoRepository.save(veiculo);
    }


    // Criação do veículo a partir do DTO
    public Veiculo createVeiculoComDTO(VeiculoRequestDTO veiculoRequestDTO) {

//        Veiculo veiculo = new Veiculo();
//
//        //Isso tudo pode esta dentro de um mapper
//        veiculo.setPlaca(veiculoRequestDTO.getPlaca());
//        veiculo.setModeloMarca(veiculoRequestDTO.getModeloMarca());
//        //veiculo.setTeste(veiculoRequestDTO.getTeste());
//        return veiculoRepository.save(veiculo);

        //Usando o mapper
        Veiculo veiculo = veiculoMapper.toEntity(veiculoRequestDTO);
        return veiculoRepository.save(veiculo);
    }

    // Atualização do veículo a partir do DTO
    public Veiculo updateVeiculo(Long id, VeiculoRequestDTO veiculoRequestDTO) {
        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));
        veiculo.setPlaca(veiculoRequestDTO.getPlaca());
        veiculo.setModeloMarca(veiculoRequestDTO.getModeloMarca());
        return veiculoRepository.save(veiculo);
    }

    public void deleteVeiculo(Long id) {
        veiculoRepository.deleteById(id);
    }
}
