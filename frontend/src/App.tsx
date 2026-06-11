import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Modal from './components/Modal';
import { useLanguage } from './i18n/LanguageContext';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-[#3A1212]/20 pb-6">
        <div>
          <p className="editorial-badge inline-block mb-4">{t('dashboard.overview')}</p>
          <h2 className="text-6xl font-display font-bold tracking-tight text-[#3A1212]">
            {t('dashboard.fleetStatus')}
          </h2>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="editorial-button-outline flex items-center gap-2"
        >
          <span>{t('dashboard.addVehicle')}</span>
          <ArrowUpRight size={18} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="editorial-card rotate-1 z-10 bg-[#F0EAE1]">
          <h3 className="font-serif italic text-lg mb-2 text-[#3A1212]/70">{t('dashboard.totalFleet')}</h3>
          {isLoading ? <div className="skeleton h-12 w-24"></div> : <p className="font-display text-5xl font-medium animate-fade-in">142</p>}
        </div>
        
        <div className="editorial-card -rotate-2 z-20 bg-[#3A1212] text-[#F0EAE1] -ml-4 mt-4 shadow-xl">
          <h3 className="font-serif italic text-lg mb-2 text-[#F0EAE1]/70">{t('dashboard.activeNow')}</h3>
          {isLoading ? <div className="skeleton h-12 w-24 opacity-20"></div> : <p className="font-display text-5xl font-medium text-[#C84B31] animate-fade-in">87</p>}
        </div>
        
        <div className="editorial-card rotate-1 z-10 bg-[#F0EAE1] mt-8">
          <h3 className="font-serif italic text-lg mb-2 text-[#3A1212]/70">{t('dashboard.recentAlerts')}</h3>
          {isLoading ? <div className="skeleton h-12 w-24"></div> : <p className="font-display text-5xl font-medium animate-fade-in">12</p>}
        </div>
      </div>
      
      <div className="editorial-card p-8 mt-12 bg-white/50 backdrop-blur-sm">
        <h3 className="font-display text-2xl mb-6 flex items-center justify-between">
          <span>{t('dashboard.recentTelemetry')}</span>
          <span className="text-sm font-sans text-[#3A1212]/60 font-normal">{t('dashboard.lastUpdated')}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="border-b border-[#3A1212]/20 text-[#3A1212]/60 text-sm uppercase tracking-wider">
                <th className="pb-4 font-normal">{t('table.vehicleId')}</th>
                <th className="pb-4 font-normal">{t('table.speed')}</th>
                <th className="pb-4 font-normal">{t('table.temp')}</th>
                <th className="pb-4 font-normal">{t('table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="border-b border-[#3A1212]/10">
                    <td className="py-4"><div className="skeleton h-5 w-20"></div></td>
                    <td className="py-4"><div className="skeleton h-5 w-16"></div></td>
                    <td className="py-4"><div className="skeleton h-5 w-12"></div></td>
                    <td className="py-4"><div className="skeleton h-5 w-16"></div></td>
                  </tr>
                ))
              ) : (
                <>
                  <tr className="border-b border-[#3A1212]/10 hover:bg-[#3A1212]/5 transition-colors animate-fade-in">
                    <td className="py-4 font-bold font-display tracking-wide">CAR-001</td>
                    <td className="py-4">105 km/h</td>
                    <td className="py-4">92°C</td>
                    <td className="py-4 text-[#C84B31] italic font-serif">{t('table.status.warning')}</td>
                  </tr>
                  <tr className="border-b border-[#3A1212]/10 hover:bg-[#3A1212]/5 transition-colors animate-fade-in">
                    <td className="py-4 font-bold font-display tracking-wide">CAR-042</td>
                    <td className="py-4">60 km/h</td>
                    <td className="py-4">80°C</td>
                    <td className="py-4 text-[#5D8265] italic font-serif">{t('table.status.normal')}</td>
                  </tr>
                  <tr className="hover:bg-[#3A1212]/5 transition-colors animate-fade-in">
                    <td className="py-4 font-bold font-display tracking-wide">TRK-109</td>
                    <td className="py-4">0 km/h</td>
                    <td className="py-4">40°C</td>
                    <td className="py-4 text-[#3A1212]/60 italic font-serif">{t('table.status.idle')}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title={t('modal.addVehicle.title')}
      >
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }}>
          <div className="space-y-2">
            <label className="font-serif italic text-sm text-[#3A1212]/80 block">{t('modal.addVehicle.id')}</label>
            <input 
              type="text" 
              placeholder="e.g. CAR-143"
              className="w-full bg-transparent border-b border-[#3A1212]/30 py-2 focus:outline-none focus:border-[#C84B31] transition-colors font-display text-xl uppercase"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="font-serif italic text-sm text-[#3A1212]/80 block">{t('modal.addVehicle.type')}</label>
            <select className="w-full bg-transparent border-b border-[#3A1212]/30 py-2 focus:outline-none focus:border-[#C84B31] transition-colors font-sans appearance-none">
              <option>{t('modal.addVehicle.type.sedan')}</option>
              <option>{t('modal.addVehicle.type.truck')}</option>
              <option>{t('modal.addVehicle.type.van')}</option>
              <option>{t('modal.addVehicle.type.motorcycle')}</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="font-serif italic text-sm text-[#3A1212]/80 block">{t('modal.addVehicle.odometer')}</label>
            <input 
              type="number" 
              defaultValue={0}
              className="w-full bg-transparent border-b border-[#3A1212]/30 py-2 focus:outline-none focus:border-[#C84B31] transition-colors font-sans"
              required
            />
          </div>
          <div className="pt-6 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={() => setIsAddModalOpen(false)}
              className="editorial-button-outline !border-transparent hover:!bg-[#3A1212]/10 !text-[#3A1212]"
            >
              {t('modal.addVehicle.cancel')}
            </button>
            <button type="submit" className="editorial-button">
              {t('modal.addVehicle.submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const Maintenance = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const openScheduleModal = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setIsScheduleModalOpen(true);
  };

  return (
    <div className="space-y-12">
      <div className="border-b border-[#3A1212]/20 pb-6">
        <p className="editorial-badge inline-block mb-4 border-[#C84B31] text-[#C84B31]">{t('maintenance.actionRequired')}</p>
        <h2 className="text-6xl font-display font-bold tracking-tight text-[#3A1212]">
          {t('maintenance.logs')}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="editorial-card bg-[#F0EAE1]">
          <div className="flex justify-between items-start mb-8">
            <div>
              {isLoading ? <div className="skeleton h-10 w-32 mb-2"></div> : <h3 className="font-display text-4xl mb-1 animate-fade-in">CAR-001</h3>}
              <p className="font-serif italic text-[#3A1212]/60">{t('maintenance.lastService')}: June 1, 2026</p>
            </div>
            {!isLoading && (
              <span className="editorial-badge bg-[#C84B31] text-[#F0EAE1] border-transparent not-italic font-sans uppercase text-xs tracking-wider animate-fade-in">
                {t('maintenance.due')}
              </span>
            )}
          </div>
          
          <div className="space-y-4 mb-8 text-[#3A1212]/80">
            <div className="flex justify-between border-b border-[#3A1212]/10 pb-2">
              <span>{t('maintenance.currentOdometer')}</span>
              {isLoading ? <div className="skeleton h-5 w-16"></div> : <span className="font-bold">5,020 km</span>}
            </div>
            <div className="flex justify-between border-b border-[#3A1212]/10 pb-2">
              <span>{t('maintenance.nextMaintenance')}</span>
              {isLoading ? <div className="skeleton h-5 w-16"></div> : <span className="font-bold">5,000 km</span>}
            </div>
          </div>
          
          <button 
            disabled={isLoading}
            onClick={() => openScheduleModal('CAR-001')}
            className={`editorial-button w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {t('maintenance.scheduleService')}
          </button>
        </div>
        
        <div className="editorial-card bg-white/40">
          <div className="flex justify-between items-start mb-8">
            <div>
              {isLoading ? <div className="skeleton h-10 w-32 mb-2"></div> : <h3 className="font-display text-4xl mb-1 animate-fade-in">TRK-009</h3>}
              <p className="font-serif italic text-[#3A1212]/60">{t('maintenance.lastService')}: May 15, 2026</p>
            </div>
            {!isLoading && (
              <span className="editorial-badge bg-[#5D8265] text-[#F0EAE1] border-transparent not-italic font-sans uppercase text-xs tracking-wider animate-fade-in">
                {t('maintenance.ok')}
              </span>
            )}
          </div>
          
          <div className="space-y-4 mb-8 text-[#3A1212]/80">
            <div className="flex justify-between border-b border-[#3A1212]/10 pb-2">
              <span>{t('maintenance.currentOdometer')}</span>
              {isLoading ? <div className="skeleton h-5 w-16"></div> : <span className="font-bold">12,400 km</span>}
            </div>
            <div className="flex justify-between border-b border-[#3A1212]/10 pb-2">
              <span>{t('maintenance.nextMaintenance')}</span>
              {isLoading ? <div className="skeleton h-5 w-16"></div> : <span className="font-bold">15,000 km</span>}
            </div>
          </div>
          
          <button className="editorial-button-outline w-full opacity-50 cursor-not-allowed" disabled>
            {t('maintenance.noActionNeeded')}
          </button>
        </div>
      </div>

      <Modal 
        isOpen={isScheduleModalOpen} 
        onClose={() => setIsScheduleModalOpen(false)}
        title={t('modal.schedule.title')}
      >
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsScheduleModalOpen(false); }}>
          <div className="bg-[#3A1212]/5 p-4 rounded-sm border border-[#3A1212]/10">
            <p className="font-serif italic text-sm text-[#3A1212]/80 mb-1">{t('modal.schedule.selected')}</p>
            <p className="font-display text-2xl tracking-widest">{selectedVehicle}</p>
          </div>

          <div className="space-y-2">
            <label className="font-serif italic text-sm text-[#3A1212]/80 block">{t('modal.schedule.date')}</label>
            <input 
              type="date" 
              className="w-full bg-transparent border-b border-[#3A1212]/30 py-2 focus:outline-none focus:border-[#C84B31] transition-colors font-sans"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="font-serif italic text-sm text-[#3A1212]/80 block">{t('modal.schedule.notes')}</label>
            <textarea 
              rows={3}
              placeholder={t('modal.schedule.placeholder')}
              className="w-full bg-transparent border-b border-[#3A1212]/30 py-2 focus:outline-none focus:border-[#C84B31] transition-colors font-sans resize-none"
            ></textarea>
          </div>
          <div className="pt-6 flex justify-end gap-4">
            <button 
              type="button" 
              onClick={() => setIsScheduleModalOpen(false)}
              className="editorial-button-outline !border-transparent hover:!bg-[#3A1212]/10 !text-[#3A1212]"
            >
              {t('modal.schedule.cancel')}
            </button>
            <button type="submit" className="editorial-button">
              {t('modal.schedule.submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Register onLogin={handleLogin} />
          } />
        </Route>

        {/* Protected Routes */}
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} onLogout={handleLogout} />}>
          <Route index element={<Dashboard />} />
          <Route path="maintenance" element={<Maintenance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
