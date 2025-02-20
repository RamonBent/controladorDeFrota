package com.controlador.controladorFrota.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_viagem")
public class Viagem {
    @Id
    Long id;
//    Dispesas dispesas;
//    Motorista motorista;
//    Veiculo veiculo;
}
