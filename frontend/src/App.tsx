import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import DashboardSection from './components/sections/DashboardSection';
import DriversSection from './components/sections/DriversSection';
import LoadsSection from './components/sections/LoadsSection';
import VehiclesSection from './components/sections/VehiclesSection';
import TripsSection from './components/sections/TripsSection';
import ExpensesSection from './components/sections/ExpensesSection';
import { ToastContainer } from './components/common/Toast';
import { useToast } from './hooks/useToast';
import { Section } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
  };

  const handleShowToast = (toast: { type: 'success' | 'error' | 'warning' | 'info'; title: string; message?: string }) => {
    addToast(toast);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection onShowToast={handleShowToast} />;
      case 'drivers':
        return <DriversSection onShowToast={handleShowToast} />;
      case 'loads':
        return <LoadsSection onShowToast={handleShowToast} />;
      case 'vehicles':
        return <VehiclesSection onShowToast={handleShowToast} />;
      case 'trips':
        return <TripsSection onShowToast={handleShowToast} />;
      case 'expenses':
        return <ExpensesSection onShowToast={handleShowToast} />;
      default:
        return <DashboardSection onShowToast={handleShowToast} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </main>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;