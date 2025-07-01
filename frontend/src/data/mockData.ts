import { Driver, Load, Vehicle, Expense, Trip } from '../types';

export const mockDrivers: Driver[] = [
  {
    id: '1',
    nome: 'João Silva Santos',
    dataNasc: '1985-03-15',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    nome: 'Maria Oliveira Costa',
    dataNasc: '1990-07-22',
    createdAt: '2024-01-20T14:15:00Z'
  },
  {
    id: '3',
    nome: 'Carlos Eduardo Lima',
    dataNasc: '1982-11-08',
    createdAt: '2024-02-01T09:45:00Z'
  }
];

export const mockLoads: Load[] = [
  {
    id: '1',
    origem: 'São Paulo - SP',
    destino: 'Rio de Janeiro - RJ',
    distancia: 430,
    tonelada: 25,
    valorTonelada: 150,
    valorTotal: 3750,
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: '2',
    origem: 'Belo Horizonte - MG',
    destino: 'Salvador - BA',
    distancia: 850,
    tonelada: 30,
    valorTonelada: 180,
    valorTotal: 5400,
    createdAt: '2024-01-15T11:30:00Z'
  },
  {
    id: '3',
    origem: 'Curitiba - PR',
    destino: 'Florianópolis - SC',
    distancia: 300,
    tonelada: 20,
    valorTonelada: 200,
    valorTotal: 4000,
    createdAt: '2024-02-05T16:20:00Z'
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    placa: 'ABC-1234',
    modeloMarca: 'Scania R450',
    createdAt: '2024-01-05T12:00:00Z'
  },
  {
    id: '2',
    placa: 'DEF-5678',
    modeloMarca: 'Volvo FH540',
    createdAt: '2024-01-12T15:30:00Z'
  },
  {
    id: '3',
    placa: 'GHI-9012',
    modeloMarca: 'Mercedes-Benz Actros',
    createdAt: '2024-01-18T10:15:00Z'
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    combustivel: 800,
    manutencao: 450,
    outros: 150,
    totalDespesas: 1400,
    createdAt: '2024-01-20T14:00:00Z'
  },
  {
    id: '2',
    combustivel: 950,
    manutencao: 0,
    outros: 200,
    totalDespesas: 1150,
    createdAt: '2024-01-25T09:30:00Z'
  },
  {
    id: '3',
    combustivel: 720,
    manutencao: 1200,
    outros: 80,
    totalDespesas: 2000,
    createdAt: '2024-02-01T11:45:00Z'
  }
];

export const mockTrips: Trip[] = [
  {
    id: '1',
    descricao: 'Entrega de equipamentos industriais',
    cargaId: '1',
    veiculoId: '1',
    motoristaId: '1',
    despesasId: '1',
    createdAt: '2024-01-22T08:00:00Z'
  },
  {
    id: '2',
    descricao: 'Transporte de materiais de construção',
    cargaId: '2',
    veiculoId: '2',
    motoristaId: '2',
    despesasId: '2',
    createdAt: '2024-01-26T10:30:00Z'
  },
  {
    id: '3',
    descricao: 'Distribuição de produtos alimentícios',
    cargaId: '3',
    veiculoId: '3',
    motoristaId: '3',
    despesasId: '3',
    createdAt: '2024-02-03T13:15:00Z'
  }
];