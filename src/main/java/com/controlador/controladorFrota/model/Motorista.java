package com.controlador.controladorFrota.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;


@Data
@Entity
@Table(name = "tb_motorista")
public class Motorista {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String nome;

    @JsonFormat(pattern = "dd/MM/yyyy") // Formato desejado
    LocalDate dataNasc;
}


