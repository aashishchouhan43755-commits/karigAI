import React from 'react';
import { SupportedLanguage } from '../types.ts';
import { IndianBorderPattern } from './IndianMotifs.tsx';
import { KarigAiLogo } from './KarigAiLogo.tsx';
import {
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  Settings,
  User,
  ShoppingBag,
  Palette,
  ShieldAlert
} from 'lucide-react';
import { TRANSLATIONS } from '../translations.ts';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeRole: 'artisan' | 'buyer' | 'admin';
  onRoleChange: (role: 'artisan' | 'buyer' | 'admin') => void;
  isMobileDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  onResetDemoData: () => void;
  currentUser?: { phone: string; name: string; role: 'artisan' | 'buyer' } | null;
  onOpenAuthModal?: () => void;
  onOpenSettings: () => void;
}

const LANGUAGES: { code: SupportedLanguage; name: string; nativeName: string }[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' }
];

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  activeRole,
  onRoleChange,
  isMobileDeviceFrame,
  onToggleDeviceFrame,
  onResetDemoData,
  currentUser,
  onOpenAuthModal,
  onOpenSettings
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const isHindi = currentLanguage === 'hi';

  return (
    <header id="karigai-main-header" className="bg-[#FAF7F2] border-b border-[#E7DACB] sticky top-0 z-40 shadow-2xs backdrop-blur-md">
      {/* Decorative Traditional Indian Border Motif */}
      <IndianBorderPattern className="h-1.5 text-[#B84A28] opacity-75" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3">
        {/* Brand: Clean Logo with zero sentence clutters */}
        <div className="flex items-center gap-2">
          <KarigAiLogo size="md" />
        </div>

        {/* Center: Role Switcher (Artisan vs Buyer ONLY - No Admin option here!) */}
        <div className="flex items-center bg-[#EFE5D8] p-1 rounded-2xl border border-[#D9C8B5] text-xs font-semibold">
          <button
            id="role-artisan-btn"
            type="button"
            onClick={() => onRoleChange('artisan')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeRole === 'artisan'
                ? 'bg-[#B84A28] text-white shadow-xs font-bold'
                : 'text-[#5C4D40] hover:text-[#1A1817]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>{t.artisanMode}</span>
          </button>
          <button
            id="role-buyer-btn"
            type="button"
            onClick={() => onRoleChange('buyer')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeRole === 'buyer'
                ? 'bg-[#0E747E] text-white shadow-xs font-bold'
                : 'text-[#5C4D40] hover:text-[#1A1817]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.buyerMode}</span>
          </button>

          {/* If currently in Admin mode (opened from Settings), show a discrete exit indicator */}
          {activeRole === 'admin' && (
            <div className="px-2.5 py-1 rounded-xl bg-[#2E2825] text-amber-300 flex items-center gap-1.5 text-[11px] ml-1">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              <span>Admin Active</span>
              <button
                type="button"
                onClick={() => onRoleChange('artisan')}
                title="Exit Admin Mode"
                className="ml-1 text-amber-200 hover:text-white underline cursor-pointer"
              >
                Exit
              </button>
            </div>
          )}
        </div>

        {/* Right Actions: User Account, Language, Settings Icon, Reset */}
        <div className="flex items-center gap-2">
          {/* User Profile Pill or Sign In Trigger */}
          {currentUser ? (
            <button
              type="button"
              onClick={onOpenAuthModal}
              title="Click to switch account"
              className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#D9C8B5] text-[11px] text-[#3D332A] font-medium shadow-2xs hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  currentUser.role === 'artisan' ? 'bg-[#B84A28]' : 'bg-[#0E747E]'
                }`}
              />
              <span className="font-semibold truncate max-w-[120px]">{currentUser.name}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#B84A28] text-white text-xs font-bold shadow-xs hover:bg-[#9E3B1C] transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>{isHindi ? 'प्रवेश' : 'Sign In'}</span>
            </button>
          )}

          {/* Minimal Native Language Selector */}
          <div className="relative flex items-center bg-white border border-[#D9C8B5] rounded-xl px-2.5 py-1.5 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-[#B84A28] mr-1.5 shrink-0" />
            <select
              id="language-selector-dropdown"
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Select language"
              className="text-xs font-semibold text-[#3D332A] bg-transparent outline-hidden cursor-pointer pr-1"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* Viewport Frame Toggle */}
          <button
            id="toggle-device-frame-btn"
            type="button"
            onClick={onToggleDeviceFrame}
            title={isMobileDeviceFrame ? 'Switch to Full Desktop View' : 'Switch to Artisan Mobile App View'}
            className="p-2 rounded-xl bg-white border border-[#D9C8B5] text-[#5C4D40] hover:text-[#1A1817] hover:bg-[#FAF7F2] shadow-2xs transition-all cursor-pointer"
          >
            {isMobileDeviceFrame ? (
              <Monitor className="w-4 h-4 text-[#0E747E]" />
            ) : (
              <Smartphone className="w-4 h-4 text-[#B84A28]" />
            )}
          </button>

          {/* Settings Button: Houses the Admin mode, full controls */}
          <button
            id="open-settings-modal-btn"
            type="button"
            onClick={onOpenSettings}
            title={isHindi ? 'सेटिंग्स व व्यवस्थापक' : 'Settings & Admin'}
            className="p-2 rounded-xl bg-white border border-[#D9C8B5] text-[#5C4D40] hover:text-[#1A1817] hover:bg-[#FAF7F2] shadow-2xs transition-all cursor-pointer group"
          >
            <Settings className="w-4 h-4 text-stone-600 group-hover:rotate-45 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </header>
  );
};
