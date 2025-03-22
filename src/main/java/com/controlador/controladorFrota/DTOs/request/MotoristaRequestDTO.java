package com.controlador.controladorFrota.DTOs.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MotoristaRequestDTO {
    String nome;
    LocalDate dataNasc;
}
