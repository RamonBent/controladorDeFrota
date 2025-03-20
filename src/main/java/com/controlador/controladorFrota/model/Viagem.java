package com.controlador.controladorFrota.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_viagem")
public class Viagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String nome;

    @OneToOne //Uma carga só pode ter uma viagemó
    @JoinColumn(name = "carga_id",referencedColumnName = "id")
    Carga carga;

    @ManyToOne //Um veiculo pode ter varias viagens
    @JoinColumn(name = "placa_id",referencedColumnName = "id")
    Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "motorista_id", referencedColumnName = "id")
    Motorista motorista;

    @OneToOne
    @JoinColumn(name = "despesas_id", referencedColumnName = "id")
    Despesas despesas;
}


