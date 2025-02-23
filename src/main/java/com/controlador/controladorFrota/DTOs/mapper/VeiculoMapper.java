package com.controlador.controladorFrota.DTOs.mapper;

import com.controlador.controladorFrota.DTOs.request.VeiculoRequestDTO;
import com.controlador.controladorFrota.DTOs.response.VeiculoResponseDTO;
import com.controlador.controladorFrota.model.Veiculo;
import org.springframework.stereotype.Component;

@Component
public class VeiculoMapper {
    // Método para converter a entidade Veiculo em VeiculoResponseDTO
    // Ta sendo ultilizado no service para retornar só oque quero
    public VeiculoResponseDTO toResponseDTO(Veiculo veiculo) {
        VeiculoResponseDTO responseDTO = new VeiculoResponseDTO();
        //responseDTO.setId(veiculo.getId());
        responseDTO.setPlaca(veiculo.getPlaca());
        responseDTO.setModeloMarca(veiculo.getModeloMarca());
        return responseDTO;
    }

    // Método para converter um VeiculoRequestDTO em uma entidade Veiculo
    // Não esta sendo ultilizado mas posso colocar ele no criador de veiculo
    public Veiculo toEntity(VeiculoRequestDTO requestDTO) {
        Veiculo veiculo = new Veiculo();
        veiculo.setPlaca(requestDTO.getPlaca());
        veiculo.setModeloMarca(requestDTO.getModeloMarca());
        return veiculo;
    }
}
