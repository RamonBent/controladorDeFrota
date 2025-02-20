package com.controlador.controladorFrota.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "tb_dispesas")
public class Dispesas {
    @Id
    Long id;
    BigDecimal combustivel;
    BigDecimal manutencao;
    BigDecimal alimentacao;
    BigDecimal outros;
}
