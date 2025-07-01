import React, { useState } from 'react';
import { Plus, Search, DollarSign, Fuel, Wrench, MoreHorizontal, Trash2, Eye } from 'lucide-react';
import { Expense } from '../../types';
import { mockExpenses } from '../../data/mockData';
import Modal from '../common/Modal';

interface ExpensesSectionProps {
  onShowToast: (toast: { type: 'success' | 'error'; title: string; message?: string }) => void;
}

const ExpensesSection: React.FC<ExpensesSectionProps> = ({ onShowToast }) => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    combustivel: '',
    manutencao: '',
    outros: ''
  });

  const filteredExpenses = expenses.filter(expense => {
    const searchValue = parseFloat(searchTerm);
    if (!isNaN(searchValue)) {
      return expense.totalDespesas === searchValue ||
             expense.combustivel === searchValue ||
             expense.manutencao === searchValue ||
             expense.outros === searchValue;
    }
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const combustivel = parseFloat(formData.combustivel) || 0;
    const manutencao = parseFloat(formData.manutencao) || 0;
    const outros = parseFloat(formData.outros) || 0;
    const totalDespesas = combustivel + manutencao + outros;

    const newExpense: Expense = {
      id: Date.now().toString(),
      combustivel,
      manutencao,
      outros,
      totalDespesas,
      createdAt: new Date().toISOString()
    };

    setExpenses([...expenses, newExpense]);
    setFormData({ combustivel: '', manutencao: '', outros: '' });
    setIsCreateModalOpen(false);
    
    onShowToast({
      type: 'success',
      title: 'Despesa cadastrada!',
      message: `Despesa de ${formatCurrency(totalDespesas)} foi adicionada.`
    });
  };

  const handleDelete = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    setExpenses(expenses.filter(e => e.id !== id));
    
    onShowToast({
      type: 'success',
      title: 'Despesa removida!',
      message: 'Despesa foi removida com sucesso.'
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

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.totalDespesas, 0);
  const totalFuel = filteredExpenses.reduce((sum, expense) => sum + expense.combustivel, 0);
  const totalMaintenance = filteredExpenses.reduce((sum, expense) => sum + expense.manutencao, 0);
  const totalOthers = filteredExpenses.reduce((sum, expense) => sum + expense.outros, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Despesas</h2>
          <p className="text-gray-600">Controle de gastos operacionais</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-[#94A187] hover:bg-[#7a8870] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Despesa
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#94A187]">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-[#94A187]" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Geral</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center">
            <Fuel className="w-8 h-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Combustível</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalFuel)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center">
            <Wrench className="w-8 h-8 text-blue-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Manutenção</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalMaintenance)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center">
            <MoreHorizontal className="w-8 h-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Outros</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalOthers)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por valor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
        />
      </div>

      {/* Expenses List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Combustível</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manutenção</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outros</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{expense.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Fuel className="w-4 h-4 text-red-500 mr-2" />
                      {formatCurrency(expense.combustivel)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Wrench className="w-4 h-4 text-blue-500 mr-2" />
                      {formatCurrency(expense.manutencao)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <MoreHorizontal className="w-4 h-4 text-yellow-500 mr-2" />
                      {formatCurrency(expense.outros)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#94A187]">
                    {formatCurrency(expense.totalDespesas)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(expense.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedExpense(expense);
                          setIsDetailsModalOpen(true);
                        }}
                        className="bg-[#306BAC] hover:bg-[#255089] text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        Ver
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma despesa encontrada</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Tente uma busca diferente' : 'Cadastre a primeira despesa'}
            </p>
          </div>
        )}
      </div>

      {/* Create Expense Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Cadastrar Nova Despesa"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Combustível (R$)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.combustivel}
              onChange={(e) => setFormData({ ...formData, combustivel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Manutenção (R$)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.manutencao}
              onChange={(e) => setFormData({ ...formData, manutencao: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Outros Gastos (R$)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.outros}
              onChange={(e) => setFormData({ ...formData, outros: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#306BAC] focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          {(formData.combustivel || formData.manutencao || formData.outros) && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Total das Despesas:</span>
                <span className="text-xl font-bold text-[#94A187]">
                  {formatCurrency(
                    (parseFloat(formData.combustivel) || 0) +
                    (parseFloat(formData.manutencao) || 0) +
                    (parseFloat(formData.outros) || 0)
                  )}
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

      {/* Expense Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Detalhes da Despesa"
      >
        {selectedExpense && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-[#306BAC] rounded-full flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900">Despesa #{selectedExpense.id}</h3>
                  <p className="text-gray-600">Registrada em {formatDate(selectedExpense.createdAt)}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#94A187]">
                  {formatCurrency(selectedExpense.totalDespesas)}
                </div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-2">
                  <Fuel className="w-5 h-5 text-red-600 mr-2" />
                  <h4 className="font-semibold text-red-900">Combustível</h4>
                </div>
                <div className="text-2xl font-bold text-red-700">
                  {formatCurrency(selectedExpense.combustivel)}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <Wrench className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-900">Manutenção</h4>
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {formatCurrency(selectedExpense.manutencao)}
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-2">
                  <MoreHorizontal className="w-5 h-5 text-yellow-600 mr-2" />
                  <h4 className="font-semibold text-yellow-900">Outros</h4>
                </div>
                <div className="text-2xl font-bold text-yellow-700">
                  {formatCurrency(selectedExpense.outros)}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Distribuição dos Gastos</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Combustível:</span>
                  <span className="font-medium">
                    {((selectedExpense.combustivel / selectedExpense.totalDespesas) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Manutenção:</span>
                  <span className="font-medium">
                    {((selectedExpense.manutencao / selectedExpense.totalDespesas) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Outros:</span>
                  <span className="font-medium">
                    {((selectedExpense.outros / selectedExpense.totalDespesas) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ExpensesSection;