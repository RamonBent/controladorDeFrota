package com.controlador.controladorFrota.repositorys;

import com.controlador.controladorFrota.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VeiculoRepository extends JpaRepository <Veiculo, Long> {
}
