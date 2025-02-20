package com.controlador.controladorFrota.repositorys;

import com.controlador.controladorFrota.model.Motorista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotoristaRepository extends JpaRepository <Motorista, Long> {
}
