import { Outlet } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const AuthLayout = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex min-h-screen w-full bg-[#F0EAE1] overflow-hidden text-[#3A1212] selection:bg-[#C84B31] selection:text-[#F0EAE1]">
      
      {/* Left side: Editorial Typography & Image replacement */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#3A1212] text-[#F0EAE1] p-16 relative overflow-hidden border-r border-[#3A1212]/20">
        
        {/* Decorative Texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
        </div>
        
        {/* SNS Logo */}
        <div className="relative z-10 mb-12">
          <div className="flex items-end">
            <div className="text-4xl font-serif italic font-bold text-[#F0EAE1] leading-none tracking-tighter">S</div>
            <div className="text-2xl font-display font-light text-[#C84B31] leading-none mb-1 -ml-1">N</div>
            <div className="text-4xl font-serif italic font-bold text-[#F0EAE1] leading-none tracking-tighter -ml-1">S</div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#C84B31] ml-1 mb-1"></div>
          </div>
        </div>

        {/* Main Title */}
        <div className="relative z-10">
          <h1 className="text-6xl font-display font-light leading-none tracking-tight">
            <span className="block italic font-serif text-3xl text-[#C84B31] mb-4">{t('sidebar.title1')}</span>
            {t('sidebar.title2')}<br/>
            <span className="opacity-70">{t('sidebar.title3')}</span>
          </h1>
          <div className="w-16 h-px bg-[#C84B31] mt-8"></div>
        </div>

        {/* McLaren Image Container */}
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[90%] mix-blend-lighten opacity-95 hover:opacity-100 hover:scale-[1.02] transition-all duration-700 ease-out">
          <img 
            src="/mcLaren.avif" 
            alt="McLaren Editorial" 
            className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] contrast-125 brightness-105"
          />
        </div>

        <div className="relative z-10 text-[#F0EAE1]/60 font-serif italic max-w-sm text-lg leading-relaxed mt-auto">
          {t('auth.quote')}
        </div>
      </div>

      {/* Right side: Form Container */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16 relative">
        
        {/* Language Toggle Absolute Top Right */}
        <div className="absolute top-8 right-8 z-20">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
            className="font-display font-bold text-[#3A1212] flex items-center bg-transparent border border-[#3A1212]/30 rounded-full overflow-hidden hover:border-[#3A1212] transition-colors"
          >
            <span className={`px-3 py-1 transition-colors ${language === 'en' ? 'bg-[#3A1212] text-[#F0EAE1]' : 'text-[#3A1212]/50'}`}>EN</span>
            <span className={`px-3 py-1 transition-colors ${language === 'vi' ? 'bg-[#3A1212] text-[#F0EAE1]' : 'text-[#3A1212]/50'}`}>VI</span>
          </button>
        </div>

        <div className="w-full max-w-md animate-fade-in relative z-10">
          <Outlet />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-[#C84B31]/5 blur-3xl pointer-events-none z-0"></div>
      </div>

    </div>
  );
};

export default AuthLayout;
