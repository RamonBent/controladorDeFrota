package com.controlador.controladorFrota.DTOs.request;


import lombok.Data;

import java.math.BigDecimal;

@Data
public class CargaRequestDTO {
    String origem;
    String destino;
    int distancia;
    int tonelada;
    BigDecimal valorTonelada;

    public BigDecimal getValorTonelada() {
        return valorTonelada;
    }
}