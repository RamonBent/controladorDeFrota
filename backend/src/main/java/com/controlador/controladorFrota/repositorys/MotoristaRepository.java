package com.controlador.controladorFrota.repositorys;

import com.controlador.controladorFrota.model.Motorista;
import com.controlador.controladorFrota.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MotoristaRepository extends JpaRepository <Motorista, Long> {
    @Query("SELECT v FROM Motorista v WHERE v.nome LIKE %:nome%")
    List<Motorista> filtrarPorNomeMotorista(@Param("nome") String nome);

}
