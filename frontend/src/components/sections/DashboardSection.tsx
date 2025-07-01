import React, { useState } from 'react';
import { 
  Users, 
  Package, 
  Truck, 
  MapPin, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Fuel,
  Wrench,
  MoreHorizontal,
  Activity
} from 'lucide-react';
import { Driver, Load, Vehicle, Expense, Trip } from '../../types';
import { mockDrivers, mockLoads, mockVehicles, mockExpenses, mockTrips } from '../../data/mockData';

interface DashboardSectionProps {
  onShowToast: (toast: { type: 'success' | 'error' | 'warning' | 'info'; title: string; message?: string }) => void;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ onShowToast }) => {
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [loads] = useState<Load[]>(mockLoads);
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [expenses] = useState<Expense[]>(mockExpenses);
  const [trips] = useState<Trip[]>(mockTrips);

  // Helper functions
  const getDriver = (id: string) => drivers.find(d => d.id === id);
  const getLoad = (id: string) => loads.find(l => l.id === id);
  const getVehicle = (id: string) => vehicles.find(v => v.id === v.id);
  const getExpense = (id: string) => expenses.find(e => e.id === id);

  // Enhanced trips with related data
  const enhancedTrips = trips.map(trip => ({
    ...trip,
    motorista: getDriver(trip.motoristaId),
    carga: getLoad(trip.cargaId),
    veiculo: getVehicle(trip.veiculoId),
    despesas: getExpense(trip.despesasId)
  }));

  // Calculate metrics
  const totalRevenue = loads.reduce((sum, load) => sum + load.valorTotal, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.totalDespesas, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  const totalDistance = loads.reduce((sum, load) => sum + load.distancia, 0);
  const totalWeight = loads.reduce((sum, load) => sum + load.tonelada, 0);
  const averageLoadValue = loads.length > 0 ? totalRevenue / loads.length : 0;

  const fuelExpenses = expenses.reduce((sum, expense) => sum + expense.combustivel, 0);
  const maintenanceExpenses = expenses.reduce((sum, expense) => sum + expense.manutencao, 0);
  const otherExpenses = expenses.reduce((sum, expense) => sum + expense.outros, 0);

  // Recent activities
  const recentTrips = enhancedTrips
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Visão geral da frota e operações</p>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          Atualizado em {formatDate(new Date().toISOString())}
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#94A187]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% vs mês anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-[#94A187] bg-opacity-10 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#94A187]" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Despesas Totais</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2% vs mês anterior
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalProfit)}</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Margem: {profitMargin.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#306BAC]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Viagens Ativas</p>
              <p className="text-2xl font-bold text-gray-900">{trips.length}</p>
              <p className="text-xs text-[#306BAC] flex items-center mt-1">
                <Activity className="w-3 h-3 mr-1" />
                {vehicles.length} veículos em operação
              </p>
            </div>
            <div className="w-12 h-12 bg-[#306BAC] bg-opacity-10 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#306BAC]" />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-[#306BAC] mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Motoristas</p>
              <p className="text-xl font-bold text-gray-900">{drivers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Truck className="w-8 h-8 text-[#306BAC] mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Veículos</p>
              <p className="text-xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-[#306BAC] mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Cargas</p>
              <p className="text-xl font-bold text-gray-900">{loads.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-[#306BAC] mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Distância Total</p>
              <p className="text-xl font-bold text-gray-900">{formatNumber(totalDistance)} km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Despesas</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Fuel className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-sm font-medium text-gray-700">Combustível</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">{formatCurrency(fuelExpenses)}</div>
                <div className="text-xs text-gray-500">
                  {((fuelExpenses / totalExpenses) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{ width: `${(fuelExpenses / totalExpenses) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wrench className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-sm font-medium text-gray-700">Manutenção</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">{formatCurrency(maintenanceExpenses)}</div>
                <div className="text-xs text-gray-500">
                  {((maintenanceExpenses / totalExpenses) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(maintenanceExpenses / totalExpenses) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MoreHorizontal className="w-5 h-5 text-yellow-500 mr-3" />
                <span className="text-sm font-medium text-gray-700">Outros</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">{formatCurrency(otherExpenses)}</div>
                <div className="text-xs text-gray-500">
                  {((otherExpenses / totalExpenses) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${(otherExpenses / totalExpenses) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Performance</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Valor Médio por Carga</p>
                <p className="text-xl font-bold text-[#94A187]">{formatCurrency(averageLoadValue)}</p>
              </div>
              <Package className="w-8 h-8 text-[#94A187]" />
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Peso Total Transportado</p>
                <p className="text-xl font-bold text-[#306BAC]">{formatNumber(totalWeight)} t</p>
              </div>
              <Truck className="w-8 h-8 text-[#306BAC]" />
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Eficiência por KM</p>
                <p className="text-xl font-bold text-green-600">
                  {totalDistance > 0 ? formatCurrency(totalRevenue / totalDistance) : formatCurrency(0)}/km
                </p>
              </div>
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Viagens Recentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Viagem</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motorista</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rota</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receita</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lucro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTrips.map((trip) => {
                const profit = trip.carga && trip.despesas ? trip.carga.valorTotal - trip.despesas.totalDespesas : 0;
                return (
                  <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{trip.descricao}</div>
                      <div className="text-sm text-gray-500">#{trip.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {trip.motorista?.nome || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {trip.carga ? `${trip.carga.origem} → ${trip.carga.destino}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#94A187]">
                      {trip.carga ? formatCurrency(trip.carga.valorTotal) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {profit >= 0 ? '+' : ''}{formatCurrency(profit)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(trip.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {recentTrips.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma viagem registrada</h3>
            <p className="text-gray-600">As viagens aparecerão aqui quando forem criadas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSection;