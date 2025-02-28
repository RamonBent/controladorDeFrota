package com.controlador.controladorFrota.DTOs.request;

import com.controlador.controladorFrota.model.Carga;
import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.model.Veiculo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ViagemRequestDTO {
    String nome;
    @JsonProperty("cargaId")
    private Long cargaId; //Dessa forma aparece só o campo de id no swagger

    @JsonProperty("veiculoId")
    private Long veiculoId;

    @JsonProperty("motoristaId")
    private Long motoristaId;
}
