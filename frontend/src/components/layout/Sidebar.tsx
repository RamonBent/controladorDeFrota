import React from 'react';
import { 
  Users, 
  Package, 
  Truck, 
  MapPin, 
  DollarSign,
  Menu,
  X,
  BarChart3
} from 'lucide-react';
import { Section } from '../../types';

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onToggle 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'drivers', label: 'Motoristas', icon: Users },
    { id: 'loads', label: 'Cargas', icon: Package },
    { id: 'vehicles', label: 'Veículos', icon: Truck },
    { id: 'trips', label: 'Viagens', icon: MapPin },
    { id: 'expenses', label: 'Despesas', icon: DollarSign },
  ] as const;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        ></div>
      )}

      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 bg-[#141B41] text-white rounded-lg md:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#141B41] transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-[#306BAC]">
            <div className="flex items-center">
              <Truck className="w-8 h-8 text-[#94A187] mr-3" />
              <div>
                <h1 className="text-xl font-bold text-white">FleetManager</h1>
                <p className="text-sm text-gray-300">Sistema de Gestão</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {menuItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    onSectionChange(id as Section);
                    if (window.innerWidth < 768) onToggle();
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200
                    ${activeSection === id 
                      ? 'bg-[#94A187] text-white shadow-lg' 
                      : 'text-gray-300 hover:bg-[#306BAC] hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#306BAC]">
            <div className="text-center text-sm text-gray-400">
              © 2024 FleetManager
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;