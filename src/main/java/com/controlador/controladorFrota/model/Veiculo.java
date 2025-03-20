package com.controlador.controladorFrota.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor  // Adiciona um construtor com todos os atributos
@NoArgsConstructor   // Adiciona um construtor sem argumentos (obrigatório para JPA)
@Entity
@Table(name = "tb_veiculo")
public class Veiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String placa;
    String modeloMarca;
    String teste;
}


