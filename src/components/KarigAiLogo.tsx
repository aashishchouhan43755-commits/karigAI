import React from 'react';

interface KarigAiLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const KarigAiLogo: React.FC<KarigAiLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = ''
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Handcrafted Emblem with Lotus Petal & Diya Flame */}
      <div
        className={`relative shrink-0 rounded-xl bg-gradient-to-br from-[#B84A28] via-[#9E1B32] to-[#7A1C2D] shadow-sm flex items-center justify-center border border-[#C69214]/50 ${
          isSm ? 'w-8 h-8' : isLg ? 'w-12 h-12 rounded-2xl' : 'w-10 h-10'
        }`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className={`${isSm ? 'w-5 h-5' : isLg ? 'w-8 h-8' : 'w-6 h-6'} text-amber-200`}
        >
          {/* Sacred Lotus Petals */}
          <path
            d="M20 6C21.5 14 26 18 29 23C25 24 22 22 20 19C18 22 15 24 11 23C14 18 18.5 14 20 6Z"
            fill="currentColor"
          />
          <path
            d="M20 20C23 24 29 26 34 27C30 30 25 29 20 26C15 29 10 30 6 27C11 26 17 24 20 20Z"
            fill="#FAF5E6"
            fillOpacity="0.85"
          />
          {/* Golden Diya Flame / Spark */}
          <circle cx="20" cy="14" r="2" fill="#F59E0B" />
          <path
            d="M17 31C18.5 32.5 21.5 32.5 23 31"
            stroke="#FDE68A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Small gold sparkle dot on emblem corner */}
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full border border-white shadow-xs" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline">
          <span
            className={`font-['Rozha_One'] font-bold tracking-tight text-[#8C2D19] ${
              isSm ? 'text-lg' : isLg ? 'text-3xl' : 'text-2xl'
            }`}
          >
            karig
          </span>
          <span
            className={`font-['Cinzel'] font-extrabold tracking-normal text-[#C69214] ml-0.5 ${
              isSm ? 'text-lg' : isLg ? 'text-3xl' : 'text-2xl'
            }`}
          >
            Ai
          </span>
          {/* Decorative artisanal dot */}
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0E747E] ml-1 self-center animate-pulse" />
        </div>

        {showSubtitle && (
          <span className="text-[10px] font-semibold text-[#6B5E52] tracking-wider uppercase font-sans mt-0.5">
            Artisan Studio & Marketplace
          </span>
        )}
      </div>
    </div>
  );
};
