package com.controlador.controladorFrota.repositorys;

import com.controlador.controladorFrota.model.Dispesas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DispesasRepository extends JpaRepository<Dispesas, Long> {
}
