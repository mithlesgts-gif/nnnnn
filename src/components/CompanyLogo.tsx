import React, { useState } from 'react';
import artisanLogo from '../assets/images/shilp_artisan_logo.jpg';

interface CompanyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark' | 'auto';
  subtitle?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'auto',
  subtitle
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  // Prominent Logo Dimensions (Significantly Increased Size)
  const dimensions = {
    sm: 'w-11 h-11 sm:w-12 sm:h-12',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-28 h-28 sm:w-32 sm:h-32'
  }[size];

  const titleSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg md:text-xl lg:text-2xl',
    lg: 'text-2xl sm:text-3xl lg:text-4xl',
    xl: 'text-3xl sm:text-4xl lg:text-5xl'
  }[size];

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Intricately Framed Circular Logo Emblem */}
      <div 
        className={`relative ${dimensions} rounded-full p-[2.5px] bg-gradient-to-tr from-[#165DFF] via-white to-[#2878FF] shadow-xl shadow-blue-600/20 shrink-0 group-hover:scale-105 transition-transform duration-300 ring-2 ring-blue-500/25`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 border border-white/60 relative flex items-center justify-center shadow-inner">
          {imageLoaded ? (
            <img
              src={artisanLogo}
              alt="SHILP BIM Solutions Pvt. Ltd. Corporate Brand Logo"
              onError={() => setImageLoaded(false)}
              className="w-full h-full object-cover filter contrast-110 brightness-105 hover:scale-110 transition-transform duration-500"
              loading="eager"
            />
          ) : (
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <circle cx="50" cy="50" r="48" fill="#0B1530" stroke="#165DFF" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="44" stroke="#2878FF" strokeWidth="1.2" strokeDasharray="3 2" />
              <rect x="46" y="16" width="10" height="54" fill="#EAF2FF" rx="2" />
              <text x="50" y="86" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
                SHILP BIM
              </text>
            </svg>
          )}
        </div>

        {/* Precision blue engineering indicator node */}
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#165DFF] ring-2 ring-white shadow-sm" />
      </div>

      {/* Brand Name Typography - Prominent Company Identity */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className={`font-display font-black ${titleSizes} tracking-tight leading-none flex items-center gap-2 ${
            variant === 'dark' ? 'text-white' : 'text-[#0B1530]'
          }`}>
            <span className="tracking-tight hover:text-[#165DFF] transition-colors">SHILP BIM</span>
            <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-md bg-[#EAF2FF] text-[#165DFF] border border-blue-300 font-bold uppercase shadow-xs">
              Solutions Pvt. Ltd.
            </span>
          </div>
          {subtitle && (
            <span className={`text-[10px] sm:text-xs font-mono tracking-wider font-semibold flex items-center gap-1.5 mt-1 ${
              variant === 'dark' ? 'text-blue-200/80' : 'text-[#64748B]'
            }`}>
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};


