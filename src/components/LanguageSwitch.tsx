"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
        className="relative w-14 h-7 bg-[#112240] rounded-full border-2 border-[#64ffda] transition-all duration-300 hover:shadow-[0_0_12px_#64ffda99] focus:outline-none"
        aria-label={`Switch to ${language === 'es' ? 'English' : 'Spanish'}`}
      >
        {/* Toggle circle */}
        <div
          className={`absolute top-0.5 w-5 h-5 bg-[#64ffda] rounded-full transition-all duration-300 flex items-center justify-center text-[#0a192f] font-bold text-xs ${
            language === 'es' ? 'left-0.5' : 'left-7'
          }`}
        >
          {language === 'es' ? 'ES' : 'EN'}
        </div>
        {/* Background labels */}
        <div className="absolute inset-0 flex items-center justify-between px-1.5 text-[10px] font-mono font-bold">
          <span className={`transition-opacity duration-300 ${language === 'es' ? 'opacity-0' : 'opacity-50 text-[#64ffda]'}`}>
            ES
          </span>
          <span className={`transition-opacity duration-300 ${language === 'en' ? 'opacity-0' : 'opacity-50 text-[#64ffda]'}`}>
            EN
          </span>
        </div>
      </button>
    </div>
  );
}
