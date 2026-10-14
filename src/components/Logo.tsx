import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightMode = false
}) => {
  const sizeMap = {
    sm: { img: 'h-8 w-8', text: 'text-base', sub: 'text-[9px]' },
    md: { img: 'h-11 w-11 sm:h-12 sm:w-12', text: 'text-lg', sub: 'text-[10px]' },
    lg: { img: 'h-16 w-16 sm:h-20 sm:w-20', text: 'text-2xl', sub: 'text-xs' },
    xl: { img: 'h-24 w-24 sm:h-28 sm:w-28', text: 'text-3xl', sub: 'text-sm' }
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Original Given GP Logo with Green Leaves */}
      <div className={`relative overflow-hidden rounded-xl shrink-0 transition-transform duration-300 hover:scale-105 ${lightMode ? 'bg-white p-1 shadow-sm' : 'border border-stone-200/80 shadow-xs bg-white'}`}>
        <img
          src="/src/assets/images/gp_original_logo_1791651982402.jpg"
          alt="Green Page BD Logo"
          className={`${sizeMap.img} object-contain rounded-lg`}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-none select-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${sizeMap.text} ${
                lightMode ? 'text-white' : 'text-stone-950'
              }`}
            >
              GREEN PAGE
            </span>
            <span className="text-[11px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-800 text-white tracking-widest shadow-xs">
              BD
            </span>
          </div>
          <span
            className={`tracking-widest uppercase font-semibold mt-1 ${sizeMap.sub} ${
              lightMode ? 'text-emerald-300' : 'text-emerald-900'
            }`}
          >
            Online Plant Shop
          </span>
        </div>
      )}
    </div>
  );
};
