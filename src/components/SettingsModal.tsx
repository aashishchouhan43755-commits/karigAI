import React from 'react';
import { SupportedLanguage } from '../types.ts';
import { TRANSLATIONS } from '../translations.ts';
import {
  X,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  ShieldCheck,
  Palette,
  Check,
  UserCheck,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { KarigAiLogo } from './KarigAiLogo.tsx';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeRole: 'artisan' | 'buyer' | 'admin';
  onRoleChange: (role: 'artisan' | 'buyer' | 'admin') => void;
  isMobileDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  onResetDemoData: () => void;
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

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onLanguageChange,
  activeRole,
  onRoleChange,
  isMobileDeviceFrame,
  onToggleDeviceFrame,
  onResetDemoData
}) => {
  if (!isOpen) return null;

  const isHindi = currentLanguage === 'hi';
  const t = TRANSLATIONS[currentLanguage];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-[#FAF7F2] rounded-3xl border border-[#D9C8B5] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header with KarigAi Logo and Close */}
        <div className="px-6 py-4 bg-white border-b border-[#E7DACB] flex items-center justify-between">
          <KarigAiLogo size="sm" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isHindi ? 'सेटिंग्स' : 'Settings'}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close settings"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Language Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#B84A28]" />
              <span>{isHindi ? 'भाषा चयन (Language)' : 'Language'}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {LANGUAGES.map((lang) => {
                const isSelected = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#B84A28] text-white border-[#B84A28] shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Viewport Frame Toggle */}
          <div className="space-y-2 pt-2 border-t border-[#E7DACB]">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#0E747E]" />
              <span>{isHindi ? 'प्रदर्शन लेआउट' : 'Display Layout'}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  if (isMobileDeviceFrame) onToggleDeviceFrame();
                }}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  !isMobileDeviceFrame
                    ? 'bg-[#0E747E] text-white border-[#0E747E] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>{isHindi ? 'पूर्ण डेस्कटॉप दृश्य' : 'Full Desktop View'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!isMobileDeviceFrame) onToggleDeviceFrame();
                }}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  isMobileDeviceFrame
                    ? 'bg-[#0E747E] text-white border-[#0E747E] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>{isHindi ? 'कारीगर मोबाइल फ्रेम' : 'Mobile Phone Frame'}</span>
              </button>
            </div>
          </div>

          {/* Role Switching Shortcut */}
          <div className="space-y-2 pt-2 border-t border-[#E7DACB]">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              {isHindi ? 'सक्रिय भूमिका' : 'Active Experience'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onRoleChange('artisan');
                  onClose();
                }}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  activeRole === 'artisan'
                    ? 'bg-[#B84A28] text-white border-[#B84A28] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>{t.artisanMode}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onRoleChange('buyer');
                  onClose();
                }}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  activeRole === 'buyer'
                    ? 'bg-[#0E747E] text-white border-[#0E747E] shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.buyerMode}</span>
              </button>
            </div>
          </div>

          {/* Discreet Admin Option (User specified: give admin option in settings, don't need to show in all app) */}
          <div className="p-4 rounded-2xl bg-[#2E2825] text-stone-200 space-y-3 shadow-md">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 font-['Cinzel'] tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHindi ? 'सहकारी समिति व प्रशासन' : 'Cooperative & Oversight'}</span>
                </span>
                <h4 className="text-sm font-bold font-['Rozha_One'] text-amber-100">
                  {isHindi ? 'प्रशासनिक पोर्टल (Admin Dashboard)' : 'Administrative Access'}
                </h4>
                <p className="text-[11px] text-stone-300 leading-relaxed max-w-xs">
                  {isHindi
                    ? 'क्लस्टर मेट्रिक्स, GI सत्यापन और ₹180/घंटा आजीविका मजदूरी निगरानी।'
                    : 'Review cluster impact metrics, GI registry lineage, and fair living wage monitoring.'}
                </p>
              </div>
            </div>

            {activeRole === 'admin' ? (
              <div className="flex items-center justify-between pt-1 border-t border-stone-700">
                <span className="text-xs text-amber-300 font-bold">
                  ✓ {isHindi ? 'वर्तमान में व्यवस्थापक मोड सक्रिय है' : 'Admin Mode Currently Active'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('artisan');
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
                >
                  {isHindi ? 'मोड छोड़ें' : 'Exit Admin'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                id="enter-admin-mode-btn"
                onClick={() => {
                  onRoleChange('admin');
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-stone-950" />
                <span>{isHindi ? 'व्यवस्थापक पोर्टल खोलें' : 'Enter Admin Dashboard'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Reset Demo Data */}
          <div className="pt-2 border-t border-[#E7DACB] flex items-center justify-between">
            <span className="text-xs text-stone-500">
              {isHindi ? 'डेमो डेटा रीसेट करें:' : 'Demo State:'}
            </span>
            <button
              type="button"
              onClick={() => {
                onResetDemoData();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
              <span>{isHindi ? 'डेटा रीसेट' : 'Reset Demo Data'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
