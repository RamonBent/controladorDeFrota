package com.controlador.controladorFrota.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_viagem")
public class Viagem {
    @Id
    Long id;
    //String teste;
    String nome;

    @OneToOne //Uma carga só pode ter uma viagemó
    @JoinColumn(name = "carga_id",referencedColumnName = "id")
    Carga carga;

//    Dispesas dispesas;
//    Motorista motorista;

    @ManyToOne //Um veiculo pode ter varias viagens
    @JoinColumn(name = "placa_id",referencedColumnName = "id")
    Veiculo veiculo;
}
