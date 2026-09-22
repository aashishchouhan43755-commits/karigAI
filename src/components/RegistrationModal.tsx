import React, { useState } from 'react';
import { KarigAiLogo } from './KarigAiLogo.tsx';
import { SupportedLanguage } from '../types.ts';
import {
  Phone,
  KeyRound,
  Sparkles,
  ArrowRight,
  UserCheck,
  Palette,
  ShoppingBag,
  ShieldCheck,
  Check
} from 'lucide-react';
import { RangoliMandala } from './IndianMotifs.tsx';

interface RegistrationModalProps {
  currentLanguage: SupportedLanguage;
  onSuccess: (user: {
    phone: string;
    name: string;
    cluster?: string;
    role: 'artisan' | 'buyer';
  }) => void;
  onClose?: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  currentLanguage,
  onSuccess,
  onClose
}) => {
  const [selectedRole, setSelectedRole] = useState<'artisan' | 'buyer'>('artisan');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState('123456');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [error, setError] = useState<string | null>(null);

  const isHindi = currentLanguage === 'hi';

  const handleRoleSelect = (role: 'artisan' | 'buyer') => {
    setSelectedRole(role);
    if (role === 'artisan') {
      setPhoneNumber('9876543210');
    } else {
      setPhoneNumber('9811223344');
    }
    setOtp('123456');
    setError(null);
  };

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 10) {
      setError(isHindi ? 'कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setError(null);
    setStep('otp');
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (otp !== '123456' && otp.trim().length !== 6) {
      setError(isHindi ? 'अमान्य OTP। डेमो OTP: 123456' : 'Invalid OTP. Demo OTP: 123456');
      return;
    }
    setError(null);
    if (selectedRole === 'artisan') {
      onSuccess({
        phone: phoneNumber,
        name: 'Smt. Manjula Devi',
        cluster: 'Mithila Craft Cluster, Bihar',
        role: 'artisan'
      });
    } else {
      onSuccess({
        phone: phoneNumber,
        name: 'Heritage Retail Group',
        cluster: 'Wholesale Buyer Network',
        role: 'buyer'
      });
    }
  };

  const handleQuickDemoEnter = (role: 'artisan' | 'buyer') => {
    if (role === 'artisan') {
      onSuccess({
        phone: '9876543210',
        name: 'Smt. Manjula Devi',
        cluster: 'Mithila Craft Cluster, Bihar',
        role: 'artisan'
      });
    } else {
      onSuccess({
        phone: '9811223344',
        name: 'Heritage Retail Group',
        cluster: 'Wholesale Buyer Network',
        role: 'buyer'
      });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-[#FAF7F2] rounded-3xl border border-[#D9C8B5] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-150">
        {/* Subtle Decorative Rangoli in corner */}
        <div className="absolute -top-12 -right-12 w-36 h-36 text-[#B84A28] opacity-[0.06] pointer-events-none">
          <RangoliMandala className="w-full h-full" />
        </div>

        {/* Top Heritage Accent Ribbon */}
        <div className="h-1.5 bg-gradient-to-r from-[#B84A28] via-[#C69214] to-[#0E747E]" />

        <div className="p-6 sm:p-7 space-y-5">
          {/* Brand Logo Display - Using Logo directly rather than text sentences */}
          <div className="flex flex-col items-center text-center space-y-1">
            <KarigAiLogo size="md" />
            <span className="text-[11px] font-bold text-[#8C5D0B] uppercase tracking-wider font-['Cinzel'] mt-1">
              {isHindi ? 'पंजीकरण एवं प्रवेश' : 'Direct Heritage Gateway'}
            </span>
          </div>

          {/* Identity Selection: Who is this? Artisan or Buyer */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block text-center">
              {isHindi ? 'आप कौन हैं? (Choose Your Role)' : 'Who is this?'}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {/* Artisan Option */}
              <button
                type="button"
                id="role-select-artisan"
                onClick={() => handleRoleSelect('artisan')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  selectedRole === 'artisan'
                    ? 'bg-[#B84A28] text-white border-[#B84A28] shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                {selectedRole === 'artisan' && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-white text-[#B84A28] flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      selectedRole === 'artisan' ? 'bg-white/20 text-white' : 'bg-orange-100 text-[#B84A28]'
                    }`}
                  >
                    <Palette className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">
                    {isHindi ? 'कारीगर' : 'Artisan'}
                  </span>
                </div>
                <p
                  className={`text-[10px] leading-tight ${
                    selectedRole === 'artisan' ? 'text-orange-100' : 'text-stone-500'
                  }`}
                >
                  {isHindi
                    ? 'शिल्प कैटलॉग व आजीविका मजदूरी'
                    : 'Craft maker & studio'}
                </p>
              </button>

              {/* Buyer Option */}
              <button
                type="button"
                id="role-select-buyer"
                onClick={() => handleRoleSelect('buyer')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  selectedRole === 'buyer'
                    ? 'bg-[#0E747E] text-white border-[#0E747E] shadow-sm'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                {selectedRole === 'buyer' && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-white text-[#0E747E] flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      selectedRole === 'buyer' ? 'bg-white/20 text-white' : 'bg-teal-100 text-[#0E747E]'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">
                    {isHindi ? 'खरीदार' : 'Buyer'}
                  </span>
                </div>
                <p
                  className={`text-[10px] leading-tight ${
                    selectedRole === 'buyer' ? 'text-teal-100' : 'text-stone-500'
                  }`}
                >
                  {isHindi
                    ? 'थोक व खुदरा सीधी खरीद'
                    : 'Retail & wholesale orders'}
                </p>
              </button>
            </div>
          </div>

          {/* Quick 1-Click Demo Entry Card */}
          <div className="p-3 rounded-2xl bg-[#FAF5E6] border border-[#C69214]/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#8C5D0B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C69214]" />
                <span>
                  {isHindi
                    ? selectedRole === 'artisan' ? 'कारीगर डेमो' : 'खरीदार डेमो'
                    : selectedRole === 'artisan' ? 'Artisan Demo' : 'Buyer Demo'}
                </span>
              </span>
              <span className="text-[11px] font-mono text-[#8C5D0B]">
                {selectedRole === 'artisan' ? '9876543210' : '9811223344'} • 123456
              </span>
            </div>
            <button
              type="button"
              id="quick-demo-login-btn"
              onClick={() => handleQuickDemoEnter(selectedRole)}
              className={`w-full py-2 px-3 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 ${
                selectedRole === 'artisan' ? 'bg-[#B84A28] hover:bg-[#9E3B1C]' : 'bg-[#0E747E] hover:bg-[#09575F]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>
                {isHindi
                  ? selectedRole === 'artisan' ? '1-क्लिक कारीगर प्रवेश' : '1-क्लिक खरीदार प्रवेश'
                  : selectedRole === 'artisan' ? '1-Click Artisan Login' : '1-Click Buyer Login'}
              </span>
            </button>
          </div>

          {/* Phone / OTP Input Form */}
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-3.5">
              <div className="space-y-1">
                <label
                  htmlFor="phone-input"
                  className="block text-xs font-bold text-stone-700"
                >
                  {isHindi ? 'मोबाइल नंबर' : 'Mobile Phone Number'}
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-stone-500 font-semibold text-xs">+91</span>
                  <input
                    id="phone-input"
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-2.5 bg-white border border-[#D9C8B5] rounded-xl text-sm font-mono tracking-wider focus:outline-hidden focus:ring-2 focus:ring-[#B84A28]"
                  />
                  <Phone className="w-4 h-4 absolute right-3 text-stone-400" />
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2 rounded-lg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                id="send-otp-btn"
                className={`w-full py-2.5 px-4 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all ${
                  selectedRole === 'artisan' ? 'bg-[#B84A28] hover:bg-[#9E3B1C]' : 'bg-[#0E747E] hover:bg-[#09575F]'
                }`}
              >
                <span>{isHindi ? 'OTP प्राप्त करें' : 'Continue with OTP'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="otp-input"
                    className="block text-xs font-bold text-stone-700"
                  >
                    {isHindi ? '6 अंकों का OTP दर्ज करें' : 'Enter 6-Digit OTP'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-[11px] text-[#B84A28] font-bold underline cursor-pointer"
                  >
                    {isHindi ? 'नंबर बदलें' : 'Change Phone'}
                  </button>
                </div>
                <div className="relative flex items-center">
                  <input
                    id="otp-input"
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full px-4 py-2.5 bg-white border border-[#D9C8B5] rounded-xl text-center text-lg font-mono tracking-widest focus:outline-hidden focus:ring-2 focus:ring-[#B84A28]"
                  />
                  <KeyRound className="w-4 h-4 absolute right-3 text-stone-400" />
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-700 bg-rose-50 border border-rose-200 p-2 rounded-lg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                id="verify-otp-btn"
                className={`w-full py-2.5 px-4 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all ${
                  selectedRole === 'artisan' ? 'bg-[#B84A28] hover:bg-[#9E3B1C]' : 'bg-[#0E747E] hover:bg-[#09575F]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isHindi ? 'सत्यापित करें एवं प्रवेश करें' : 'Verify & Enter'}</span>
              </button>
            </form>
          )}

          {/* Close/Skip Option if available */}
          {onClose && (
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
              >
                {isHindi ? 'बाद में देखें (Explore as Guest)' : 'Explore as Guest'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
