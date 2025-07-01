import React, { useState } from 'react';
import { Plus, Search, Truck, Edit3, Trash2, Eye } from 'lucide-react';
import { Vehicle } from '../../types';
import { mockVehicles } from '../../data/mockData';
import Modal from '../common/Modal';

interface VehiclesSectionProps {
  onShowToast: (toast: { type: 'success' | 'error'; title: string; message?: string }) => void;
}

const VehiclesSection: React.FC<VehiclesSectionProps> = ({ onShowToast }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    placa: '',
    modeloMarca: ''
  });

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.modeloMarca.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = !brandFilter || vehicle.modeloMarca.toLowerCase().includes(brandFilter.toLowerCase());
    return matchesSearch && matchesBrand;
  });

  const uniqueBrands = Array.from(new Set(vehicles.map(v => v.modeloMarca.split(' ')[0]))).sort();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditModalOpen && selectedVehicle) {
      // Edit existing vehicle
      const updatedVehicles = vehicles.map(v =>
        v.id === selectedVehicle.id
          ? { ...v, placa: formData.placa, modeloMarca: formData.modeloMarca }
          : v
      );
      setVehicles(updatedVehicles);
      setIsEditModalOpen(false);
      
      onShowToast({
        type: 'success',
        title: 'Veículo atualizado!',
        message: `${formData.placa} foi atualizado com sucesso.`
      });
    } else {
      // Create new vehicle
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        placa: formData.placa,
        modeloMarca: formData.modeloMarca,
        createdAt: new Date().toISOString()
      };

      setVehicles([...vehicles, newVehicle]);
      setIsCreateModalOpen(false);
      
      onShowToast({
        type: 'success',
        title: 'Veículo cadastrado!',
        message: `${newVehicle.placa} foi adicionado com sucesso.`
      });
    }
    
    setFormData({ placa: '', modeloMarca: '' });
    setSelectedVehicle(null);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      placa: vehicle.placa,
      modeloMarca: vehicle.modeloMarca
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const vehicle = vehicles.find(v => v.id === id);
    setVehicles(vehicles.filter(v => v.id !== id));
    
    onShowToast({
      type: 'success',
      title: 'Veículo removido!',
      message: `${vehicle?.placa} foi removido com sucesso.`
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatPlate = (plate: string) => {
    return plate.toUpperCase();
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setFormData({ placa: '', modeloMarca: '' });
    setSelectedVehicle(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Veículos</h2>
          <p className="text-gray-600">Gerencie a frota de veículos</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#94A187] hover:bg-[#7a8870] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Veículo
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por placa ou modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
          />
        </div>
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
        >
          <option value="">Todas as Marcas</option>
          {uniqueBrands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#306BAC] rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{formatPlate(vehicle.placa)}</h3>
                  <p className="text-sm text-gray-600">ID: {vehicle.id}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm">
                <span className="text-gray-600">Modelo/Marca:</span>
                <div className="font-medium text-gray-900">{vehicle.modeloMarca}</div>
              </div>
              <div className="text-xs text-gray-500">
                Cadastrado em: {formatDate(vehicle.createdAt)}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setSelectedVehicle(vehicle);
                  setIsDetailsModalOpen(true);
                }}
                className="flex-1 bg-[#306BAC] hover:bg-[#255089] text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Detalhes
              </button>
              <button
                onClick={() => handleEdit(vehicle)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(vehicle.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum veículo encontrado</h3>
          <p className="text-gray-600">
            {searchTerm || brandFilter ? 'Tente uma busca diferente' : 'Cadastre o primeiro veículo da frota'}
          </p>
        </div>
      )}

      {/* Create/Edit Vehicle Modal */}
      <Modal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={closeModals}
        title={isEditModalOpen ? 'Editar Veículo' : 'Cadastrar Novo Veículo'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placa
            </label>
            <input
              type="text"
              required
              value={formData.placa}
              onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent uppercase"
              placeholder="ABC-1234"
              maxLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modelo/Marca
            </label>
            <input
              type="text"
              required
              value={formData.modeloMarca}
              onChange={(e) => setFormData({ ...formData, modeloMarca: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
              placeholder="Ex: Scania R450, Volvo FH540"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModals}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#94A187] hover:bg-[#7a8870] text-white px-4 py-2 rounded-lg transition-colors"
            >
              {isEditModalOpen ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Vehicle Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Detalhes do Veículo"
      >
        {selectedVehicle && (
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-[#306BAC] rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-900">{formatPlate(selectedVehicle.placa)}</h3>
                <p className="text-gray-600">ID: {selectedVehicle.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Informações do Veículo</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Placa:</span>
                    <span className="ml-2 font-medium">{formatPlate(selectedVehicle.placa)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Modelo/Marca:</span>
                    <span className="ml-2 font-medium">{selectedVehicle.modeloMarca}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Registro</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Cadastrado em:</span>
                    <span className="ml-2 font-medium">{formatDate(selectedVehicle.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VehiclesSection;