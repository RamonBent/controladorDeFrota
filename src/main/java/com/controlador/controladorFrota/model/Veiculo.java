package com.controlador.controladorFrota.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_veiculo")
public class Veiculo {
    @Id
    Long id;
    String placa;
    //Motorista motorista;
    String modeloMarca;
    //Viagem viagem;
}
