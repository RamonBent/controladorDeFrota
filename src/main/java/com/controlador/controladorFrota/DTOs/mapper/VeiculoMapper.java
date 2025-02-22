package com.controlador.controladorFrota.DTOs.mapper;

import com.controlador.controladorFrota.DTOs.response.VeiculoResponseDTO;
import com.controlador.controladorFrota.model.Veiculo;
import org.springframework.stereotype.Component;

@Component
public class VeiculoMapper {
    // Método para converter a entidade Veiculo em VeiculoResponseDTO
    public VeiculoResponseDTO toResponseDTO(Veiculo veiculo) {
        VeiculoResponseDTO responseDTO = new VeiculoResponseDTO();
        //responseDTO.setId(veiculo.getId());
        responseDTO.setPlaca(veiculo.getPlaca());
        responseDTO.setModeloMarca(veiculo.getModeloMarca());
        return responseDTO;
    }
}
