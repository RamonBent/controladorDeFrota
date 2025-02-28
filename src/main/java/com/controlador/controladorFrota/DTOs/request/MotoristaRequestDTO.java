package com.controlador.controladorFrota.DTOs.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MotoristaRequestDTO {
    String nome;
    LocalDateTime dataNasc;
}
