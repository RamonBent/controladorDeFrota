export interface Driver {
  id: string;
  nome: string;
  dataNasc: string;
  createdAt: string;
}

export interface Load {
  id: string;
  origem: string;
  destino: string;
  distancia: number;
  tonelada: number;
  valorTonelada: number;
  valorTotal: number;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  placa: string;
  modeloMarca: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  combustivel: number;
  manutencao: number;
  outros: number;
  totalDespesas: number;
  createdAt: string;
}

export interface Trip {
  id: string;
  descricao: string;
  cargaId: string;
  veiculoId: string;
  motoristaId: string;
  despesasId: string;
  motorista?: Driver;
  carga?: Load;
  veiculo?: Vehicle;
  despesas?: Expense;
  createdAt: string;
}

export type Section = 'dashboard' | 'drivers' | 'loads' | 'vehicles' | 'trips' | 'expenses';