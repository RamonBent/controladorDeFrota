package com.controlador.controladorFrota.repositorys;

import com.controlador.controladorFrota.model.Carga;
import com.controlador.controladorFrota.model.Motorista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CargaRepository extends JpaRepository <Carga,Long> {
    @Query("SELECT v FROM Carga v WHERE v.destino LIKE %:destino%")
    List<Carga> filtrarPorDestino(@Param("destino") String destino);

    @Query("SELECT v FROM Carga v WHERE v.origem LIKE %:origem%")
    List<Carga> filtrarPorOrigem(@Param("origem") String origem);
}
