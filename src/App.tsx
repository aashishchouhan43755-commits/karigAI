import React, { useState, useEffect } from 'react';
import {
  SupportedLanguage,
  CraftProduct,
  B2BEnquiry,
  ArtisanProfile,
  AdminImpactMetrics
} from './types.ts';
import { TRANSLATIONS } from './translations.ts';
import { Header } from './components/Header.tsx';
import { AIStudioTab } from './components/AIStudioTab.tsx';
import { InventoryTab } from './components/InventoryTab.tsx';
import { B2BMarketplaceTab } from './components/B2BMarketplaceTab.tsx';
import { AdminDashboardTab } from './components/AdminDashboardTab.tsx';
import { SettingsModal } from './components/SettingsModal.tsx';
import { RegistrationModal } from './components/RegistrationModal.tsx';
import { IndianBorderPattern, RangoliBackground } from './components/IndianMotifs.tsx';
import { KarigAiLogo } from './components/KarigAiLogo.tsx';
import {
  Camera,
  Package,
  Building2,
  ShieldCheck,
  Wifi,
  Battery,
  Award
} from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('hi');
  const [activeRole, setActiveRole] = useState<'artisan' | 'buyer' | 'admin'>('artisan');
  const [activeTab, setActiveTab] = useState<'studio' | 'inventory' | 'b2b' | 'admin'>('studio');
  const [isMobileDeviceFrame, setIsMobileDeviceFrame] = useState<boolean>(false);

  // Auth and Settings Modals
  const [currentUser, setCurrentUser] = useState<{
    phone: string;
    name: string;
    cluster?: string;
    role: 'artisan' | 'buyer';
  } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Data States
  const [products, setProducts] = useState<CraftProduct[]>([]);
  const [enquiries, setEnquiries] = useState<B2BEnquiry[]>([]);
  const [artisanProfile, setArtisanProfile] = useState<ArtisanProfile | null>(null);
  const [adminMetrics, setAdminMetrics] = useState<AdminImpactMetrics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLanguage];

  // Fetch initial data from backend API
  const fetchAllData = async () => {
    setIsLoading(true);
    setErrorNotice(null);
    try {
      const [prodRes, enqRes, artRes, metricsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/enquiries'),
        fetch('/api/artisans/art-001'),
        fetch('/api/admin/metrics')
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData);
      }
      if (artRes.ok) {
        const artData = await artRes.json();
        setArtisanProfile(artData);
      }
      if (metricsRes.ok) {
        const metData = await metricsRes.json();
        setAdminMetrics(metData);
      }
    } catch (err) {
      console.error('Initial data fetch error:', err);
      setErrorNotice('Network or server connection issue. Operating with local memory cache.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // When role changes, switch to appropriate default tab
  const handleRoleChange = (role: 'artisan' | 'buyer' | 'admin') => {
    setActiveRole(role);
    if (role === 'artisan') {
      setActiveTab('studio');
    } else if (role === 'buyer') {
      setActiveTab('b2b');
    } else if (role === 'admin') {
      setActiveTab('admin');
    }
  };

  // Handle successful registration/login
  const handleAuthSuccess = (user: {
    phone: string;
    name: string;
    cluster?: string;
    role: 'artisan' | 'buyer';
  }) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    handleRoleChange(user.role);
  };

  // Reset Demo Data
  const handleResetDemoData = async () => {
    try {
      const res = await fetch('/api/reset-demo', { method: 'POST' });
      if (res.ok) {
        await fetchAllData();
        setActiveTab('studio');
      }
    } catch (e) {
      console.error('Reset demo failed:', e);
    }
  };

  // Product Created in Studio
  const handleProductCreated = (newProduct: CraftProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Stock update
  const handleUpdateStock = async (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stockQuantity: newStock } : p))
    );

    try {
      await fetch(`/api/products/${id}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stockQuantity: newStock })
      });
    } catch (e) {
      console.error('Stock patch error:', e);
    }
  };

  // Enquiry Status Update
  const handleUpdateEnquiryStatus = async (
    id: string,
    status: B2BEnquiry['status'],
    notes?: string
  ) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, notes } : item))
    );

    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes })
      });
    } catch (e) {
      console.error('Enquiry patch error:', e);
    }
  };

  // Add new enquiry from B2B calculator
  const handleAddNewEnquiry = async (enquiry: B2BEnquiry) => {
    setEnquiries((prev) => [enquiry, ...prev]);
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry)
      });
    } catch (e) {
      console.error('Enquiry post error:', e);
    }
  };

  // Navigation Items: Only show Admin if user explicitly entered Admin mode via Settings!
  const navItems = [
    {
      id: 'studio' as const,
      label: t.tabStudio,
      icon: Camera,
      color: '#B84A28'
    },
    {
      id: 'inventory' as const,
      label: t.tabInventory,
      icon: Package,
      color: '#8C2D19',
      count: products.length
    },
    {
      id: 'b2b' as const,
      label: t.tabB2B,
      icon: Building2,
      color: '#0E747E',
      badge: enquiries.filter((e) => e.status === 'pending').length
    },
    ...(activeRole === 'admin'
      ? [
          {
            id: 'admin' as const,
            label: t.tabDashboard,
            icon: ShieldCheck,
            color: '#2E2825'
          }
        ]
      : [])
  ];

  // Core Main Content Render
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[450px] space-y-3">
          <div className="w-10 h-10 border-3 border-[#B84A28] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-stone-600 font-['Rozha_One'] text-base">
            {currentLanguage === 'hi' ? 'कारीगAI लोड हो रहा है...' : 'Loading karigAi...'}
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'studio':
        return (
          <AIStudioTab
            currentLanguage={currentLanguage}
            onProductCreated={handleProductCreated}
            onSwitchTab={(tab) => setActiveTab(tab)}
          />
        );
      case 'inventory':
        return (
          <InventoryTab
            products={products}
            currentLanguage={currentLanguage}
            onUpdateStock={handleUpdateStock}
            onOpenStudio={() => setActiveTab('studio')}
            onOpenEnquiries={() => setActiveTab('b2b')}
          />
        );
      case 'b2b':
        return (
          <B2BMarketplaceTab
            enquiries={enquiries}
            products={products}
            currentLanguage={currentLanguage}
            onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
            onAddNewEnquiry={handleAddNewEnquiry}
          />
        );
      case 'admin':
        return adminMetrics && artisanProfile ? (
          <AdminDashboardTab
            metrics={adminMetrics}
            artisan={artisanProfile}
            currentLanguage={currentLanguage}
            onResetDemoData={handleResetDemoData}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F1E1B] flex flex-col font-sans selection:bg-[#B84A28] selection:text-white relative">
      {/* Authentic Rangoli Mandala Background Pattern */}
      <RangoliBackground />

      {/* Top Application Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        isMobileDeviceFrame={isMobileDeviceFrame}
        onToggleDeviceFrame={() => setIsMobileDeviceFrame(!isMobileDeviceFrame)}
        onResetDemoData={handleResetDemoData}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 flex flex-col justify-start pb-20 sm:pb-0 relative z-10">
        {/* If Mobile Device Frame Toggle is ON: Wrap in Smartphone Bezel */}
        {isMobileDeviceFrame ? (
          <div className="py-6 px-3 flex justify-center items-center">
            <div className="w-full max-w-[420px] bg-[#1A1817] rounded-[48px] p-3 shadow-2xl border-4 border-stone-800 ring-12 ring-stone-900/10 relative">
              {/* Phone Speaker & Camera Notch */}
              <div className="w-32 h-5 bg-[#1A1817] rounded-b-xl mx-auto mb-2 flex items-center justify-center gap-2">
                <div className="w-10 h-1 bg-stone-700 rounded-full" />
                <div className="w-2 h-2 bg-stone-800 rounded-full" />
              </div>

              {/* Status Bar */}
              <div className="px-5 pb-2 flex justify-between items-center text-[10px] text-stone-400 font-semibold select-none">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Inner Phone Screen Content */}
              <div className="bg-[#FAF7F2] rounded-[36px] overflow-hidden h-[700px] flex flex-col relative border border-[#E7DACB] shadow-inner">
                {/* Internal Mobile Top Bar */}
                <div className="px-4 py-2.5 border-b border-[#E7DACB] bg-[#FAF7F2]/95 backdrop-blur-xs shrink-0 flex items-center justify-between z-20">
                  <KarigAiLogo size="sm" />
                  <span className="text-[10px] font-bold text-[#8C5D0B] bg-[#FAF5E6] px-2 py-0.5 rounded-full border border-[#C69214]/40">
                    GI-HERITAGE
                  </span>
                </div>

                {/* Main Scroll Area: Dedicated scrollable viewport with pb-24 padding */}
                <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 space-y-4">
                  {renderTabContent()}
                </div>

                {/* Pinned Bottom Navigation Dock */}
                <div className="absolute bottom-0 left-0 right-0 z-30 px-2 py-2 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E7DACB] shadow-lg rounded-b-[36px]">
                  <div className={`grid gap-1 ${navItems.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveTab(item.id)}
                          className={`flex flex-col items-center py-1.5 px-1 rounded-xl transition-all cursor-pointer relative ${
                            isActive
                              ? 'text-[#B84A28] font-bold'
                              : 'text-stone-500 hover:text-stone-800'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                          <span className="text-[10px] mt-0.5 whitespace-nowrap">{item.label}</span>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop / Full Tablet Dashboard Layout */
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
            {/* Navigation Tab Bar (Desktop & Tablet) */}
            <div className="bg-white p-2 rounded-2xl border border-[#E4D5C5] shadow-xs hidden sm:flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`nav-tab-${item.id}`}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer relative select-none ${
                        isActive
                          ? 'bg-[#B84A28] text-white shadow-sm'
                          : 'bg-[#FAF7F2] text-[#5C4D40] hover:bg-[#EFE5D8]'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                      {item.count !== undefined && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Status Info: Clean GI & living wage status */}
              <div className="hidden lg:flex items-center gap-3 text-xs text-stone-600 pr-2">
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{currentLanguage === 'hi' ? 'सीधा भुगतान सक्रिय' : 'Direct Payout Active'}</span>
                </span>
                <span className="text-stone-300">|</span>
                <span className="text-[#8C5D0B] font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#C69214]" />
                  <span>{currentLanguage === 'hi' ? '₹180/घंटा आजीविका मजदूरी' : '₹180/hr Fair Wage'}</span>
                </span>
              </div>
            </div>

            {/* Render Selected View */}
            <div className="pb-16 sm:pb-0">
              {renderTabContent()}
            </div>
          </div>
        )}

        {/* Responsive Mobile Bottom Navigation Bar */}
        {!isMobileDeviceFrame && (
          <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E7DACB] px-3 py-1.5 shadow-lg">
            <div className={`grid gap-1 ${navItems.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`flex flex-col items-center py-1.5 px-1 rounded-xl transition-all cursor-pointer relative ${
                      isActive
                        ? 'text-[#B84A28] font-bold'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                    <span className="text-[10px] mt-0.5 whitespace-nowrap">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Traditional Indian Craft Heritage Footer - Creator details removed */}
      <footer className="bg-[#FAF7F2] border-t border-[#E7DACB] mt-auto relative z-10">
        <IndianBorderPattern className="h-1.5 text-[#B84A28] opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <KarigAiLogo size="sm" />
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="font-['Rozha_One'] text-xs text-[#8C2D19] hidden sm:inline">
              {currentLanguage === 'hi' ? 'भारतीय हस्तशिल्प एवं कारीगर मंच' : 'Indian Artisan Heritage & Direct Marketplace'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-stone-500">
            <span>Geographical Indications of Goods Act, 1999</span>
            <span>• Fair Living Wage Standard (₹180/hr)</span>
            <span>• 100% Rural Artisan Direct Payout</span>
          </div>
        </div>
      </footer>

      {/* Registration / Sign-in Modal */}
      {isAuthModalOpen && (
        <RegistrationModal
          currentLanguage={currentLanguage}
          onSuccess={handleAuthSuccess}
          onClose={currentUser ? () => setIsAuthModalOpen(false) : undefined}
        />
      )}

      {/* Settings Modal (includes discreet Admin option) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        isMobileDeviceFrame={isMobileDeviceFrame}
        onToggleDeviceFrame={() => setIsMobileDeviceFrame(!isMobileDeviceFrame)}
        onResetDemoData={handleResetDemoData}
      />
    </div>
  );
}
