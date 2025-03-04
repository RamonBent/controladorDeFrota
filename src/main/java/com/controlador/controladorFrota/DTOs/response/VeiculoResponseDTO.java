package com.controlador.controladorFrota.DTOs.response;

import lombok.Data;

@Data
public class VeiculoResponseDTO {
    private String modeloMarca;
    private String placa;
}

//Nessa classe eu determino oque vou mandar para o usuario, selecionando apenas oque quero mandar