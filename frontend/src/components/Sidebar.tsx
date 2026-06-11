import { LayoutDashboard, Wrench, AlertCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const Sidebar = () => {
  const { t } = useLanguage();

  return (
    <aside className="w-72 bg-[#3A1212] text-[#F0EAE1] h-full flex flex-col shrink-0 relative overflow-hidden border-r border-[#3A1212]/20">
      {/* Decorative texture overlay (simulating noise/organic feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      <div className="p-8 pb-12 relative z-10">
        <h1 className="text-4xl font-display font-light leading-none tracking-tight">
          <span className="block italic font-serif text-2xl text-[#C84B31] mb-2">{t('sidebar.title1')}</span>
          {t('sidebar.title2')}<br/>
          <span className="opacity-70">{t('sidebar.title3')}</span>
        </h1>
        <div className="w-12 h-px bg-[#C84B31] mt-6"></div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 relative z-10">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center gap-4 px-6 py-4 rounded-full font-display text-lg tracking-wide transition-all ${
              isActive 
                ? 'bg-[#C84B31] text-[#F0EAE1]' 
                : 'text-[#F0EAE1]/80 hover:bg-[#F0EAE1]/10 hover:text-[#F0EAE1]'
            }`
          }
        >
          <LayoutDashboard strokeWidth={1.5} size={20} />
          <span>{t('sidebar.dashboard')}</span>
        </NavLink>
        
        <NavLink 
          to="/maintenance" 
          className={({ isActive }) => 
            `flex items-center gap-4 px-6 py-4 rounded-full font-display text-lg tracking-wide transition-all ${
              isActive 
                ? 'bg-[#C84B31] text-[#F0EAE1]' 
                : 'text-[#F0EAE1]/80 hover:bg-[#F0EAE1]/10 hover:text-[#F0EAE1]'
            }`
          }
        >
          <Wrench strokeWidth={1.5} size={20} />
          <span>{t('sidebar.maintenance')}</span>
        </NavLink>
      </nav>

      <div className="p-6 relative z-10 mt-auto mb-4">
        {/* Collage tilt effect on the status card */}
        <div className="bg-[#F0EAE1] text-[#3A1212] p-5 rounded-sm -rotate-2 shadow-lg relative">
          <div className="absolute top-2 right-2 opacity-10">
            <AlertCircle size={48} />
          </div>
          <p className="font-serif italic text-sm mb-1 text-[#C84B31]">{t('sidebar.statusReport')}</p>
          <p className="font-display uppercase text-xl font-bold">{t('sidebar.allSystemsGo')}</p>
          <div className="mt-4 flex items-center gap-2 text-sm font-sans">
            <span className="w-2 h-2 rounded-full bg-[#5D8265] animate-pulse"></span>
            142 {t('sidebar.activeVehicles')}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
