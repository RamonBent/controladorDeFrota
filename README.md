# 🚛 API REST – Sistema de Controle de Frotas de Veículos de Carga

## 📘 Sobre o Projeto

Esta API RESTful foi desenvolvida para gerenciar **frotas de veículos de carga**, possibilitando o controle completo de **veículos, motoristas, viagens, despesas** e **cargas**. O sistema é ideal para transportadoras ou empresas logísticas que precisam organizar e acompanhar suas operações de transporte de forma prática, segura e escalável.

## 🔧 Funcionalidades

- Cadastro e gerenciamento de veículos e motoristas.
- Controle de viagens realizadas e seus respectivos detalhes.
- Registro e consulta de despesas relacionadas a viagens.
- Acompanhamento das cargas transportadas, com filtros por origem e destino.

---

## 📚 Endpoints da API

### 🚗 Veículo Controller

| Método | Endpoint | Descrição |
|--------|----------|------------|
| `GET` | `/veiculo/{id}` | Busca veículo por ID |
| `PUT` | `/veiculo/{id}` | Atualiza um veículo existente |
| `DELETE` | `/veiculo/{id}` | Remove um veículo pelo ID |
| `POST` | `/veiculo` | Cria um novo veículo |
| `POST` | `/veiculo/criandoComDTO` | Cria um veículo usando DTO |
| `GET` | `/veiculo/lista` | Lista todos os veículos |
| `GET` | `/veiculo/filtrar-por-modelo-marca` | Filtra veículos por modelo e marca |

---

### ✈️ Viagem Controller

| Método | Endpoint | Descrição |
|--------|----------|------------|
| `POST` | `/viagem` | Cria uma nova viagem |
| `GET` | `/viagem/lista` | Lista todas as viagens |
| `GET` | `/viagem/detalhar/{id}` | Detalha uma viagem específica |
| `DELETE` | `/viagem/deleta` | Remove uma viagem |

---

### 👨‍✈️ Motorista Controller

| Método | Endpoint | Descrição |
|--------|----------|------------|
| `POST` | `/motorista/cria` | Cadastra um novo motorista |
| `GET` | `/motorista/lista` | Lista todos os motoristas |
| `GET` | `/motorista/filtrar-por-nome-motorista` | Filtra motoristas pelo nome |
| `GET` | `/motorista/detalhar/{id}` | Detalha um motorista específico |
| `DELETE` | `/motorista/deleta/{id}` | Remove um motorista por ID |

---

### 💸 Despesas Controller

| Método | Endpoint | Descrição |
|--------|----------|------------|
| `POST` | `/cria-despesa` | Cria uma nova despesa |
| `GET` | `/lista` | Lista todas as despesas |
| `GET` | `/detalha/{id}` | Detalha uma despesa |
| `DELETE` | `/deleta` | Remove uma despesa |

---

### 📦 Carga Controller

| Método | Endpoint | Descrição |
|--------|----------|------------|
| `POST` | `/carga/cria` | Cadastra uma nova carga |
| `GET` | `/carga/lista` | Lista todas as cargas |
| `GET` | `/carga/filtrar-por-origem` | Filtra cargas por origem |
| `GET` | `/carga/filtrar-por-destino` | Filtra cargas por destino |
| `GET` | `/carga/detalhar/{id}` | Detalha uma carga |
| `DELETE` | `/carga/deleta/{id}` | Remove uma carga por ID |

---

## 🚀 Tecnologias Utilizadas

- Java + Spring Boot
- Swagger (para documentação da API)
- Banco de Dados relacional (ex: PostgreSQL ou MySQL)
- Padrão RESTful

---

## 📌 Observações

- A autenticação/autorização pode ser adicionada conforme necessidade da aplicação.
- Todos os endpoints retornam respostas padronizadas em JSON.

---


## Modelagem

![Captura de tela de 2025-02-24 10-38-10](https://github.com/user-attachments/assets/fae88076-d0f7-405a-86db-4cd35a728099)
![Captura de tela de 2025-02-24 10-31-31](https://github.com/user-attachments/assets/37dcb84e-2fe7-40ad-abf2-041b1627bc97)
