package com.controlador.controladorFrota.DTOs.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DespesasRequestDTO {
    BigDecimal combustivel;
    BigDecimal manutencao;
    BigDecimal outros;
}
