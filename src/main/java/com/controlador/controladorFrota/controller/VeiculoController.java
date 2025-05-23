package com.controlador.controladorFrota.controller;

import com.controlador.controladorFrota.DTOs.request.VeiculoRequestDTO;
import com.controlador.controladorFrota.DTOs.response.VeiculoResponseDTO;
import com.controlador.controladorFrota.model.Veiculo;
import com.controlador.controladorFrota.service.VeiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/veiculo")
@CrossOrigin(origins = "http://localhost:5173")
public class VeiculoController {
    @Autowired
    private VeiculoService veiculoService;

//     Nesse caso, não ta sendo usado o filtro(DTO), observe que só muda a classe que vai ser listada
//    @GetMapping
//    public List<Veiculo> getAllVeiculos() {
//        return veiculoService.getAllVeiculos();
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Veiculo> getVeiculoById(@PathVariable Long id) {
//        Optional<Veiculo> veiculo = veiculoService.getVeiculoById(id);
//        return veiculo.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
//    }


    //Sendo listada com filtro DTO
    @GetMapping("/lista")
    public List<VeiculoResponseDTO> getAllVeiculos() {
        return veiculoService.getAllVeiculos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VeiculoResponseDTO> getVeiculoById(@PathVariable Long id) {
        Optional<VeiculoResponseDTO> veiculo = veiculoService.getVeiculoById(id);
        return veiculo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    //criando veiculo dessa forma na quesicao aparece tudo que esta em Veiculo sem filtro DTO
    @PostMapping
    public ResponseEntity<Veiculo> createVeiculo(@RequestBody Veiculo veiculo) {
        Veiculo createdVeiculo = veiculoService.createVeiculo(veiculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVeiculo);
    }

    @PostMapping("/criandoComDTO")
    public ResponseEntity<Veiculo> createVeiculo(@RequestBody VeiculoRequestDTO veiculoRequestDTO) {
        Veiculo createdVeiculo = veiculoService.createVeiculoComDTO(veiculoRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVeiculo);
    }

    // Atualizar um veículo existente com o DTO
    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> updateVeiculo(@PathVariable Long id,
                                                 @RequestBody VeiculoRequestDTO veiculoRequestDTO) {
        Veiculo updatedVeiculo = veiculoService.updateVeiculo(id, veiculoRequestDTO);
        return ResponseEntity.ok(updatedVeiculo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVeiculo(@PathVariable Long id) {
        veiculoService.deleteVeiculo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filtrar-por-modelo-marca")
    public ResponseEntity<List<Veiculo>> filtrarPorModeloMarca(@RequestParam String modeloMarca) {
        List<Veiculo> veiculos = veiculoService.filtrarPorModeloMarca(modeloMarca);
        return ResponseEntity.ok(veiculos);
    }
}
