import React from 'react';

export const IndianBorderPattern: React.FC<{ className?: string }> = ({ className = 'h-3 text-[#B84A28]' }) => (
  <svg
    className={`w-full ${className}`}
    preserveAspectRatio="none"
    viewBox="0 0 400 12"
    fill="currentColor"
  >
    <pattern id="indian-border" width="24" height="12" patternUnits="userSpaceOnUse">
      <path d="M0,6 Q6,0 12,6 Q18,12 24,6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="6" r="1.5" fill="currentColor" />
      <path d="M6,2 L6,4 M18,8 L18,10" stroke="currentColor" strokeWidth="1" />
    </pattern>
    <rect width="100%" height="12" fill="url(#indian-border)" />
  </svg>
);

export const PaisleyMotif: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-[#C69214]' }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path
      d="M16 28C9 28 5 23 5 17C5 10 11 6 16 3C15 7 17 9 20 9C24 9 27 12 27 17C27 23 23 28 16 28Z"
      fill="currentColor"
      fillOpacity="0.12"
    />
    <circle cx="16" cy="18" r="3" fill="currentColor" fillOpacity="0.25" />
    <path d="M16 11C18 13 18 15 16 17" strokeLinecap="round" />
  </svg>
);

export const GISignatureBadge: React.FC<{ tagCode?: string; region?: string; className?: string }> = ({
  tagCode = 'GI-CERTIFIED',
  region = 'India',
  className = ''
}) => (
  <div
    id="gi-authenticity-badge"
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF5E6] border border-[#C69214] text-[#8C5D0B] text-xs font-semibold shadow-xs ${className}`}
  >
    <svg className="w-3.5 h-3.5 text-[#B84A28] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
    <span className="tracking-wide">GI TAG CERTIFIED</span>
    <span className="text-[10px] text-[#A1711A] font-normal hidden sm:inline">| {region}</span>
  </div>
);

export const LotusEmblem: React.FC<{ className?: string }> = ({ className = 'w-8 h-8 text-[#B84A28]' }) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor">
    {/* Stylized Lotus Center and Petals */}
    <path d="M32 10C34 22 42 28 46 36C40 37 35 34 32 30C29 34 24 37 18 36C22 28 30 22 32 10Z" />
    <path d="M32 32C36 38 46 41 53 43C47 48 39 46 32 42C25 46 17 48 11 43C18 41 28 38 32 32Z" fillOpacity="0.8" />
    <path d="M32 44C38 48 48 51 56 50C48 55 38 54 32 52C26 54 16 55 8 50C16 51 26 48 32 44Z" fillOpacity="0.6" />
    <circle cx="32" cy="24" r="2.5" fill="#FAF7F2" />
  </svg>
);

export const RangoliMandala: React.FC<{ className?: string }> = ({
  className = 'w-64 h-64 text-[#B84A28]'
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Central Core */}
    <circle cx="100" cy="100" r="8" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="100" cy="100" r="16" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="100" cy="100" r="24" stroke="currentColor" strokeWidth="1.5" />

    {/* 8 Symmetrical Petals Inner */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <g key={`inner-${angle}`} transform={`rotate(${angle} 100 100)`}>
        <path
          d="M100 76 C94 65 92 50 100 42 C108 50 106 65 100 76 Z"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="100" cy="48" r="2.5" fill="currentColor" fillOpacity="0.6" />
        <circle cx="100" cy="36" r="1.5" fill="currentColor" />
      </g>
    ))}

    {/* Mid Decorative Ring */}
    <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="1" />
    <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />

    {/* Outer 16 Lotus Florets */}
    {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
      <g key={`outer-${angle}`} transform={`rotate(${angle} 100 100)`}>
        <path
          d="M100 30 Q94 20 100 12 Q106 20 100 30 Z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="100" cy="8" r="1.5" fill="currentColor" />
      </g>
    ))}

    {/* Traditional Kolam Rice Flour Dots */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <g key={`dots-${angle}`} transform={`rotate(${angle} 100 100)`}>
        <circle cx="100" cy="20" r="2" fill="currentColor" />
        <circle cx="100" cy="94" r="1.5" fill="currentColor" />
      </g>
    ))}

    {/* Symmetrical Corner Arches */}
    <path d="M100 4 A96 96 0 0 1 196 100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
    <path d="M196 100 A96 96 0 0 1 100 196" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
    <path d="M100 196 A96 96 0 0 1 4 100" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
    <path d="M4 100 A96 96 0 0 1 100 4" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
  </svg>
);

export const RangoliBackground: React.FC<{ className?: string }> = ({
  className = ''
}) => (
  <div
    aria-hidden="true"
    className={`fixed inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
  >
    {/* Top Right Royal Mandala */}
    <div className="absolute -top-32 -right-32 w-96 h-96 sm:w-[540px] sm:h-[540px] text-[#B84A28] opacity-[0.04] transform rotate-12 transition-transform duration-1000">
      <RangoliMandala className="w-full h-full" />
    </div>

    {/* Bottom Left Heritage Mandala */}
    <div className="absolute -bottom-36 -left-36 w-96 h-96 sm:w-[560px] sm:h-[560px] text-[#C69214] opacity-[0.045] transform -rotate-15">
      <RangoliMandala className="w-full h-full" />
    </div>

    {/* Center Subtle Watermark */}
    <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] text-[#0E747E] opacity-[0.025] transform rotate-45">
      <RangoliMandala className="w-full h-full" />
    </div>

    {/* Subtle Kolam Border Tiling (very soft) */}
    <div className="absolute inset-0 bg-[radial-gradient(#C69214_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-[0.04]" />
  </div>
);

