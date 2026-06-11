import { Activity, LogOut } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <header className="h-24 bg-[#F0EAE1] border-b border-[#3A1212]/10 flex items-center justify-between px-10 shrink-0 relative z-10">
      <div className="flex items-center gap-6">
        <div className="editorial-badge flex items-center gap-2 text-[#C84B31] border-[#C84B31]">
          <Activity size={16} className="animate-pulse" />
          {t('header.liveTelemetry')}
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="font-sans text-sm tracking-widest text-[#3A1212]/60 uppercase">
          UTC {new Date().toISOString().split('T')[1].split('.')[0]}
        </div>
        
        <button 
          onClick={toggleLanguage}
          className="font-display font-bold text-[#3A1212] flex items-center bg-transparent border border-[#3A1212]/30 rounded-full overflow-hidden hover:border-[#3A1212] transition-colors"
        >
          <span className={`px-3 py-1 transition-colors ${language === 'en' ? 'bg-[#3A1212] text-[#F0EAE1]' : 'text-[#3A1212]/50'}`}>EN</span>
          <span className={`px-3 py-1 transition-colors ${language === 'vi' ? 'bg-[#3A1212] text-[#F0EAE1]' : 'text-[#3A1212]/50'}`}>VI</span>
        </button>

        <button 
          onClick={onLogout}
          className="editorial-button flex items-center gap-2 group hover:!bg-[#C84B31] hover:!border-[#C84B31] hover:!text-[#F0EAE1]"
        >
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t('auth.logout')}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
