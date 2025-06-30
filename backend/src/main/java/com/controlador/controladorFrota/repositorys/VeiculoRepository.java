package com.controlador.controladorFrota.repositorys;

import com.controlador.controladorFrota.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeiculoRepository extends JpaRepository <Veiculo, Long> {
    @Query("SELECT v FROM Veiculo v WHERE v.modeloMarca LIKE %:modeloMarca%")
    List<Veiculo> filtrarPorModeloMarca(@Param("modeloMarca") String modeloMarca);


}

