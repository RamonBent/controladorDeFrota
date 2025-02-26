package com.controlador.controladorFrota.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "tb_carga")
public class Carga {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String origem;
    String destino;
    int distancia;
    int tonelada;
    BigDecimal valorTonelada;
}
