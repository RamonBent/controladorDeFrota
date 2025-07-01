import React, { useState } from 'react';
import { Plus, Search, UserCheck, Calendar, Trash2, Eye } from 'lucide-react';
import { Driver } from '../../types';
import { mockDrivers } from '../../data/mockData';
import Modal from '../common/Modal';

interface DriversSectionProps {
  onShowToast: (toast: { type: 'success' | 'error'; title: string; message?: string }) => void;
}

const DriversSection: React.FC<DriversSectionProps> = ({ onShowToast }) => {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    dataNasc: ''
  });

  const filteredDrivers = drivers.filter(driver =>
    driver.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDriver: Driver = {
      id: Date.now().toString(),
      nome: formData.nome,
      dataNasc: formData.dataNasc,
      createdAt: new Date().toISOString()
    };

    setDrivers([...drivers, newDriver]);
    setFormData({ nome: '', dataNasc: '' });
    setIsCreateModalOpen(false);
    
    onShowToast({
      type: 'success',
      title: 'Motorista cadastrado!',
      message: `${newDriver.nome} foi adicionado com sucesso.`
    });
  };

  const handleDelete = (id: string) => {
    const driver = drivers.find(d => d.id === id);
    setDrivers(drivers.filter(d => d.id !== id));
    
    onShowToast({
      type: 'success',
      title: 'Motorista removido!',
      message: `${driver?.nome} foi removido com sucesso.`
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Motoristas</h2>
          <p className="text-gray-600">Gerencie os motoristas da frota</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#94A187] hover:bg-[#7a8870] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Motorista
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar motorista por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
        />
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#306BAC] rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-gray-900">{driver.nome}</h3>
                  <p className="text-sm text-gray-600">ID: {driver.id}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Nascimento: {formatDate(driver.dataNasc)}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Idade: {calculateAge(driver.dataNasc)} anos</span>
              </div>
              <div className="text-xs text-gray-500">
                Cadastrado em: {formatDate(driver.createdAt)}
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setSelectedDriver(driver);
                  setIsDetailsModalOpen(true);
                }}
                className="flex-1 bg-[#306BAC] hover:bg-[#255089] text-white px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Detalhes
              </button>
              <button
                onClick={() => handleDelete(driver.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum motorista encontrado</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Tente uma busca diferente' : 'Cadastre o primeiro motorista da frota'}
          </p>
        </div>
      )}

      {/* Create Driver Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Cadastrar Novo Motorista"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
              placeholder="Digite o nome completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de Nascimento
            </label>
            <input
              type="date"
              required
              value={formData.dataNasc}
              onChange={(e) => setFormData({ ...formData, dataNasc: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
            />
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

      {/* Driver Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Detalhes do Motorista"
      >
        {selectedDriver && (
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-[#306BAC] rounded-full flex items-center justify-center">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedDriver.nome}</h3>
                <p className="text-gray-600">ID: {selectedDriver.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Informações Pessoais</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Data de Nascimento:</span>
                    <span className="ml-2 font-medium">{formatDate(selectedDriver.dataNasc)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Idade:</span>
                    <span className="ml-2 font-medium">{calculateAge(selectedDriver.dataNasc)} anos</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Registro</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Cadastrado em:</span>
                    <span className="ml-2 font-medium">{formatDate(selectedDriver.createdAt)}</span>
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

export default DriversSection;