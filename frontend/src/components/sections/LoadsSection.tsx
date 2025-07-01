import React, { useState } from 'react';
import { Plus, Search, Package, MapPin, Truck, Trash2, Eye, DollarSign } from 'lucide-react';
import { Load } from '../../types';
import { mockLoads } from '../../data/mockData';
import Modal from '../common/Modal';

interface LoadsSectionProps {
  onShowToast: (toast: { type: 'success' | 'error'; title: string; message?: string }) => void;
}

const LoadsSection: React.FC<LoadsSectionProps> = ({ onShowToast }) => {
  const [loads, setLoads] = useState<Load[]>(mockLoads);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'origin' | 'destination'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    origem: '',
    destino: '',
    distancia: '',
    tonelada: '',
    valorTonelada: ''
  });

  const filteredLoads = loads.filter(load => {
    const searchLower = searchTerm.toLowerCase();
    switch (filterType) {
      case 'origin':
        return load.origem.toLowerCase().includes(searchLower);
      case 'destination':
        return load.destino.toLowerCase().includes(searchLower);
      default:
        return load.origem.toLowerCase().includes(searchLower) ||
               load.destino.toLowerCase().includes(searchLower);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tonelada = parseFloat(formData.tonelada);
    const valorTonelada = parseFloat(formData.valorTonelada);
    const valorTotal = tonelada * valorTonelada;

    const newLoad: Load = {
      id: Date.now().toString(),
      origem: formData.origem,
      destino: formData.destino,
      distancia: parseInt(formData.distancia),
      tonelada,
      valorTonelada,
      valorTotal,
      createdAt: new Date().toISOString()
    };

    setLoads([...loads, newLoad]);
    setFormData({ origem: '', destino: '', distancia: '', tonelada: '', valorTonelada: '' });
    setIsCreateModalOpen(false);
    
    onShowToast({
      type: 'success',
      title: 'Carga cadastrada!',
      message: `Carga de ${newLoad.origem} para ${newLoad.destino} foi adicionada.`
    });
  };

  const handleDelete = (id: string) => {
    const load = loads.find(l => l.id === id);
    setLoads(loads.filter(l => l.id !== id));
    
    onShowToast({
      type: 'success',
      title: 'Carga removida!',
      message: `Carga removida com sucesso.`
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cargas</h2>
          <p className="text-gray-600">Gerencie as cargas transportadas</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#94A187] hover:bg-[#7a8870] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Carga
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por origem ou destino..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as 'all' | 'origin' | 'destination')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
        >
          <option value="all">Todos</option>
          <option value="origin">Por Origem</option>
          <option value="destination">Por Destino</option>
        </select>
      </div>

      {/* Loads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLoads.map((load) => (
          <div key={load.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#306BAC] rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">Carga #{load.id}</h3>
                  <p className="text-sm text-gray-600">{load.tonelada}t</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[#94A187]">
                  {formatCurrency(load.valorTotal)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatCurrency(load.valorTonelada)}/t
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-green-600" />
                <span className="font-medium">Origem:</span>
                <span className="ml-1">{load.origem}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-red-600" />
                <span className="font-medium">Destino:</span>
                <span className="ml-1">{load.destino}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="w-4 h-4 mr-2" />
                <span className="font-medium">Distância:</span>
                <span className="ml-1">{load.distancia} km</span>
              </div>
              <div className="text-xs text-gray-500">
                Cadastrada em: {formatDate(load.createdAt)}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setSelectedLoad(load);
                  setIsDetailsModalOpen(true);
                }}
                className="flex-1 bg-[#306BAC] hover:bg-[#255089] text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Detalhes
              </button>
              <button
                onClick={() => handleDelete(load.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLoads.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma carga encontrada</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Tente uma busca diferente' : 'Cadastre a primeira carga'}
          </p>
        </div>
      )}

      {/* Create Load Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Cadastrar Nova Carga"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Origem
              </label>
              <input
                type="text"
                required
                value={formData.origem}
                onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
                placeholder="Cidade - UF"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destino
              </label>
              <input
                type="text"
                required
                value={formData.destino}
                onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
                placeholder="Cidade - UF"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distância (km)
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.distancia}
                onChange={(e) => setFormData({ ...formData, distancia: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Toneladas
              </label>
              <input
                type="number"
                required
                min="0.1"
                step="0.1"
                value={formData.tonelada}
                onChange={(e) => setFormData({ ...formData, tonelada: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
                placeholder="0.0"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor por Tonelada (R$)
              </label>
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                value={formData.valorTonelada}
                onChange={(e) => setFormData({ ...formData, valorTonelada: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
                placeholder="0.00"
              />
            </div>
          </div>

          {formData.tonelada && formData.valorTonelada && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Valor Total:</span>
                <span className="text-xl font-bold text-[#94A187]">
                  {formatCurrency(parseFloat(formData.tonelada) * parseFloat(formData.valorTonelada))}
                </span>
              </div>
            </div>
          )}

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

      {/* Load Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Detalhes da Carga"
        size="lg"
      >
        {selectedLoad && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-[#306BAC] rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Carga #{selectedLoad.id}</h3>
                  <p className="text-gray-600">{selectedLoad.tonelada} toneladas</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#94A187]">
                  {formatCurrency(selectedLoad.valorTotal)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatCurrency(selectedLoad.valorTonelada)} por tonelada
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Rota</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-600">Origem</div>
                      <div className="font-medium">{selectedLoad.origem}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-red-600" />
                    <div>
                      <div className="text-sm text-gray-600">Destino</div>
                      <div className="font-medium">{selectedLoad.destino}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Truck className="w-5 h-5 mr-3 text-gray-600" />
                    <div>
                      <div className="text-sm text-gray-600">Distância</div>
                      <div className="font-medium">{selectedLoad.distancia} km</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Informações Financeiras</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Peso:</span>
                    <span className="font-medium">{selectedLoad.tonelada}t</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valor/Tonelada:</span>
                    <span className="font-medium">{formatCurrency(selectedLoad.valorTonelada)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="font-bold text-[#94A187] text-lg">{formatCurrency(selectedLoad.valorTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Registro</h4>
              <div className="text-sm text-gray-600">
                Cadastrada em: {formatDate(selectedLoad.createdAt)}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LoadsSection;