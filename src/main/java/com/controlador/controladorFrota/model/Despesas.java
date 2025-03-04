package com.controlador.controladorFrota.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "tb_despesas")
public class Despesas {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Long id;
    BigDecimal combustivel;
    BigDecimal manutencao;
    BigDecimal outros;
}
