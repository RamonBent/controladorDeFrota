package com.controlador.controladorFrota.repositorys;

import com.controlador.controladorFrota.model.Despesas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DespesasRepository extends JpaRepository<Despesas, Long> {
}
