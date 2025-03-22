package com.controlador.controladorFrota.DTOs.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ViagemRequestDTO {
    @JsonProperty("descricao")
    String descricao;

    @JsonProperty("cargaId")
    private Long cargaId; //Dessa forma aparece só o campo de id no swagger

    @JsonProperty("veiculoId")
    private Long veiculoId;

    @JsonProperty("motoristaId")
    private Long motoristaId;

    @JsonProperty("despesasID")
    private Long DespesasId;
}