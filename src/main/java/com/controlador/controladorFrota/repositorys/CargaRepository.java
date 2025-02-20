package com.controlador.controladorFrota.repositorys;

import com.controlador.controladorFrota.model.Carga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CargaRepository extends JpaRepository <Carga,Long> {
}
