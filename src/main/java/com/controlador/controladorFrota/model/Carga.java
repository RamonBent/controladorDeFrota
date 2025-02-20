package com.controlador.controladorFrota.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "tb_carga")
public class Carga {
    @Id
    Long id;
    String origem;
    String destino;
    int distancia;
    int tonelada;
    BigDecimal valorTonlada;
}
