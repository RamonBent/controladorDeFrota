package com.controlador.controladorFrota.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_viagem")
public class Viagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String descricao;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true) // Configuração de cascata e remoção de órfãos
    @JoinColumn(name = "carga_id",referencedColumnName = "id")
    Carga carga;

    @ManyToOne //Um veiculo pode ter varias viagens
    @JoinColumn(name = "placa_veiculo",referencedColumnName = "placa")
    Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "motorista_id", referencedColumnName = "id")
    Motorista motorista;

    @OneToOne //uma despesa sóo pode ter uma viagem
    @JoinColumn(name = "despesas_id", referencedColumnName = "id")
    Despesas despesas;
}


