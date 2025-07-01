import React, { useState } from 'react';
import { Plus, Search, MapPin, Calendar, User, Truck, Package, DollarSign, Trash2, Eye } from 'lucide-react';
import { Trip, Driver, Load, Vehicle, Expense } from '../../types';
import { mockTrips, mockDrivers, mockLoads, mockVehicles, mockExpenses } from '../../data/mockData';
import Modal from '../common/Modal';

interface TripsSectionProps {
  onShowToast: (toast: { type: 'success' | 'error'; title: string; message?: string }) => void;
}

const TripsSection: React.FC<TripsSectionProps> = ({ onShowToast }) => {
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [loads] = useState<Load[]>(mockLoads);
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [expenses] = useState<Expense[]>(mockExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    descricao: '',
    cargaId: '',
    veiculoId: '',
    motoristaId: '',
    despesasId: ''
  });

  // Helper functions to get related data
  const getDriver = (id: string) => drivers.find(d => d.id === id);
  const getLoad = (id: string) => loads.find(l => l.id === id);
  const getVehicle = (id: string) => vehicles.find(v => v.id === id);
  const getExpense = (id: string) => expenses.find(e => e.id === id);

  // Enhanced trips with related data
  const enhancedTrips = trips.map(trip => ({
    ...trip,
    motorista: getDriver(trip.motoristaId),
    carga: getLoad(trip.cargaId),
    veiculo: getVehicle(trip.veiculoId),
    despesas: getExpense(trip.despesasId)
  }));

  const filteredTrips = enhancedTrips.filter(trip =>
    trip.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.motorista?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.veiculo?.placa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTrip: Trip = {
      id: Date.now().toString(),
      descricao: formData.descricao,
      cargaId: formData.cargaId,
      veiculoId: formData.veiculoId,
      motoristaId: formData.motoristaId,
      despesasId: formData.despesasId,
      createdAt: new Date().toISOString()
    };

    setTrips([...trips, newTrip]);
    setFormData({
      descricao: '',
      cargaId: '',
      veiculoId: '',
      motoristaId: '',
      despesasId: ''
    });
    setIsCreateModalOpen(false);
    
    onShowToast({
      type: 'success',
      title: 'Viagem cadastrada!',
      message: `${newTrip.descricao} foi adicionada com sucesso.`
    });
  };

  const handleDelete = (id: string) => {
    const trip = trips.find(t => t.id === id);
    setTrips(trips.filter(t => t.id !== id));
    
    onShowToast({
      type: 'success',
      title: 'Viagem removida!',
      message: 'Viagem foi removida com sucesso.'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getProfit = (carga?: Load, despesas?: Expense) => {
    if (!carga || !despesas) return 0;
    return carga.valorTotal - despesas.totalDespesas;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Viagens</h2>
          <p className="text-gray-600">Gerencie as viagens da frota</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#94A187] hover:bg-[#7a8870] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Viagem
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por descrição, motorista ou placa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
        />
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#306BAC] rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{trip.descricao}</h3>
                  <p className="text-sm text-gray-600">Viagem #{trip.id}</p>
                </div>
              </div>
              {trip.carga && trip.despesas && (
                <div className="text-right">
                  <div className={`text-lg font-bold ${getProfit(trip.carga, trip.despesas) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {getProfit(trip.carga, trip.despesas) >= 0 ? '+' : ''}{formatCurrency(getProfit(trip.carga, trip.despesas))}
                  </div>
                  <div className="text-sm text-gray-500">Lucro</div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {trip.motorista && (
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span className="font-medium">Motorista:</span>
                  <span className="ml-1">{trip.motorista.nome}</span>
                </div>
              )}
              
              {trip.veiculo && (
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="w-4 h-4 mr-2" />
                  <span className="font-medium">Veículo:</span>
                  <span className="ml-1">{trip.veiculo.placa} - {trip.veiculo.modeloMarca}</span>
                </div>
              )}

              {trip.carga && (
                <div className="flex items-center text-sm text-gray-600">
                  <Package className="w-4 h-4 mr-2" />
                  <span className="font-medium">Rota:</span>
                  <span className="ml-1">{trip.carga.origem} → {trip.carga.destino}</span>
                </div>
              )}

              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-medium">Data:</span>
                <span className="ml-1">{formatDate(trip.createdAt)}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setSelectedTrip(trip);
                  setIsDetailsModalOpen(true);
                }}
                className="flex-1 bg-[#306BAC] hover:bg-[#255089] text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Detalhes
              </button>
              <button
                onClick={() => handleDelete(trip.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTrips.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma viagem encontrada</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Tente uma busca diferente' : 'Cadastre a primeira viagem'}
          </p>
        </div>
      )}

      {/* Create Trip Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Cadastrar Nova Viagem"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição da Viagem
            </label>
            <input
              type="text"
              required
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
              placeholder="Ex: Entrega de equipamentos industriais"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carga
              </label>
              <select
                required
                value={formData.cargaId}
                onChange={(e) => setFormData({ ...formData, cargaId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
              >
                <option value="">Selecione uma carga</option>
                {loads.map(load => (
                  <option key={load.id} value={load.id}>
                    #{load.id} - {load.origem} → {load.destino} ({load.tonelada}t)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Veículo
              </label>
              <select
                required
                value={formData.veiculoId}
                onChange={(e) => setFormData({ ...formData, veiculoId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
              >
                <option value="">Selecione um veículo</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.placa} - {vehicle.modeloMarca}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motorista
              </label>
              <select
                required
                value={formData.motoristaId}
                onChange={(e) => setFormData({ ...formData, motoristaId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
              >
                <option value="">Selecione um motorista</option>
                {drivers.map(driver => (
                  <option key={driver.id} value={driver.id}>
                    {driver.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Despesas
              </label>
              <select
                required
                value={formData.despesasId}
                onChange={(e) => setFormData({ ...formData, despesasId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
              >
                <option value="">Selecione as despesas</option>
                {expenses.map(expense => (
                  <option key={expense.id} value={expense.id}>
                    #{expense.id} - {formatCurrency(expense.totalDespesas)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#94A187] hover:bg-[#7a8870] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </Modal>

      {/* Trip Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Detalhes da Viagem"
        size="xl"
      >
        {selectedTrip && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-[#306BAC] rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">{selectedTrip.descricao}</h3>
                  <p className="text-gray-600">Viagem #{selectedTrip.id}</p>
                </div>
              </div>
              {selectedTrip.carga && selectedTrip.despesas && (
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getProfit(selectedTrip.carga, selectedTrip.despesas) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {getProfit(selectedTrip.carga, selectedTrip.despesas) >= 0 ? '+' : ''}{formatCurrency(getProfit(selectedTrip.carga, selectedTrip.despesas))}
                  </div>
                  <div className="text-sm text-gray-500">Lucro da Viagem</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {selectedTrip.motorista && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Motorista
                    </h4>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">{selectedTrip.motorista.nome}</div>
                      <div className="text-gray-600">ID: {selectedTrip.motorista.id}</div>
                    </div>
                  </div>
                )}

                {selectedTrip.veiculo && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Truck className="w-5 h-5 mr-2" />
                      Veículo
                    </h4>
                    <div className="text-sm space-y-1">
                      <div className="font-medium">{selectedTrip.veiculo.placa}</div>
                      <div className="text-gray-600">{selectedTrip.veiculo.modeloMarca}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {selectedTrip.carga && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Carga
                    </h4>
                    <div className="text-sm space-y-1">
                      <div><span className="text-gray-600">Origem:</span> {selectedTrip.carga.origem}</div>
                      <div><span className="text-gray-600">Destino:</span> {selectedTrip.carga.destino}</div>
                      <div><span className="text-gray-600">Peso:</span> {selectedTrip.carga.tonelada}t</div>
                      <div><span className="text-gray-600">Distância:</span> {selectedTrip.carga.distancia} km</div>
                      <div className="font-medium text-[#94A187]">Valor: {formatCurrency(selectedTrip.carga.valorTotal)}</div>
                    </div>
                  </div>
                )}

                {selectedTrip.despesas && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Despesas
                    </h4>
                    <div className="text-sm space-y-1">
                      <div><span className="text-gray-600">Combustível:</span> {formatCurrency(selectedTrip.despesas.combustivel)}</div>
                      <div><span className="text-gray-600">Manutenção:</span> {formatCurrency(selectedTrip.despesas.manutencao)}</div>
                      <div><span className="text-gray-600">Outros:</span> {formatCurrency(selectedTrip.despesas.outros)}</div>
                      <div className="font-medium text-red-600">Total: {formatCurrency(selectedTrip.despesas.totalDespesas)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Summary */}
            {selectedTrip.carga && selectedTrip.despesas && (
              <div className="bg-[#94A187] bg-opacity-10 p-6 rounded-lg border border-[#94A187]">
                <h4 className="font-semibold text-gray-900 mb-4">Resumo Financeiro</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#94A187]">{formatCurrency(selectedTrip.carga.valorTotal)}</div>
                    <div className="text-sm text-gray-600">Receita</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{formatCurrency(selectedTrip.despesas.totalDespesas)}</div>
                    <div className="text-sm text-gray-600">Despesas</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${getProfit(selectedTrip.carga, selectedTrip.despesas) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(getProfit(selectedTrip.carga, selectedTrip.despesas))}
                    </div>
                    <div className="text-sm text-gray-600">Lucro</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Registro</h4>
              <div className="text-sm text-gray-600">
                Viagem criada em: {formatDate(selectedTrip.createdAt)}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TripsSection;