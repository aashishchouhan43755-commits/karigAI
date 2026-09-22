import React, { useState } from 'react';
import { B2BEnquiry, CraftProduct, SupportedLanguage } from '../types.ts';
import { TRANSLATIONS } from '../translations.ts';
import {
  Building2,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  MessageCircle,
  TrendingUp,
  FileCheck,
  Send,
  IndianRupee,
  PackageCheck
} from 'lucide-react';
import { GISignatureBadge } from './IndianMotifs.tsx';

interface B2BMarketplaceTabProps {
  enquiries: B2BEnquiry[];
  products: CraftProduct[];
  currentLanguage: SupportedLanguage;
  onUpdateEnquiryStatus: (id: string, status: B2BEnquiry['status'], notes?: string) => void;
  onAddNewEnquiry: (enquiry: B2BEnquiry) => void;
}

export const B2BMarketplaceTab: React.FC<B2BMarketplaceTabProps> = ({
  enquiries,
  products,
  currentLanguage,
  onUpdateEnquiryStatus,
  onAddNewEnquiry
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // Quick Quotation Calculator State
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [calcQuantity, setCalcQuantity] = useState<number>(30);
  const [buyerName, setBuyerName] = useState<string>('Radhika Chawla');
  const [buyerCompany, setBuyerCompany] = useState<string>('Saffron Living Resorts, Goa');
  const [buyerType, setBuyerType] = useState<B2BEnquiry['buyerType']>('Interior Designer');
  const [buyerPhone, setBuyerPhone] = useState<string>('+91 98201 44520');
  const [buyerEmail, setBuyerEmail] = useState<string>('procurement@saffronliving.com');
  const [customNotes, setCustomNotes] = useState<string>('Seeking authentic handcrafted pieces for 30 heritage villas with GI tag certification.');
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState<string | null>(null);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  // Bulk Tier Math
  const getUnitRate = (qty: number) => {
    if (!selectedProduct) return 0;
    if (qty >= 50) return selectedProduct.pricing.b2bWholesaleTier2;
    if (qty >= 10) return selectedProduct.pricing.b2bWholesaleTier1;
    return selectedProduct.pricing.recommendedRetailPrice;
  };

  const currentUnitRate = getUnitRate(calcQuantity);
  const totalWholesaleValue = currentUnitRate * calcQuantity;
  const totalArtisanDirectEarnings = (selectedProduct ? selectedProduct.pricing.artisanLaborEarning : 0) * calcQuantity;

  const handleCreateNewEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const newEnq: B2BEnquiry = {
      id: `enq-${Date.now()}`,
      productId: selectedProduct.id,
      productTitle: selectedProduct.titleEn,
      productImage: selectedProduct.imageEnhanced || selectedProduct.imageOriginal,
      buyerName,
      buyerCompany,
      buyerType,
      buyerPhone,
      buyerEmail,
      quantityUnits: calcQuantity,
      proposedPricePerUnit: currentUnitRate,
      targetTimeline: 'Delivery required within 40 business days',
      message: customNotes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onAddNewEnquiry(newEnq);
    setQuoteSuccessMsg('थोक पूछताछ सीधे कारीगर सहकारी समिति को भेजी गई (Enquiry Sent)!');
    setTimeout(() => setQuoteSuccessMsg(null), 4000);
  };

  const generateWhatsAppLink = (enq: B2BEnquiry) => {
    const text = `Namaste ${enq.buyerName}, KarigAI artisan collective for "${enq.productTitle}" is in receipt of your wholesale enquiry for ${enq.quantityUnits} units at ₹${enq.proposedPricePerUnit}/unit. Let's finalize contract terms.`;
    return `https://api.whatsapp.com/send?phone=${enq.buyerPhone.replace(/\D/g, '')}&text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="b2b-marketplace-container" className="space-y-6">
      {/* Top Banner: Direct B2B & Export Linkage Overview */}
      <div className="bg-gradient-to-r from-[#0E747E] via-[#0A5C64] to-[#064248] text-white p-6 rounded-3xl shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 font-['Cinzel']">
            B2B WHOLESALE & EXPORT LINKAGE • B2B मार्केटप्लेस
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-['Rozha_One']">
            सीधे कारीगर से थोक खरीददारी (Direct Artisan B2B Sourcing)
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            होटल श्रृंखलाएं, इंटीरियर डिजाइनर और एक्सपोर्ट हाउस बिचौलियों को हटाकर सीधे ग्रामीण कारीगर सहकारी समितियों से थोक आर्डर कर सकते हैं। 100% प्रामाणिक GI टैग और उचित मजदूरी गारंटी।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive B2B Wholesale Quote Calculator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4D5C5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-bold text-[#1F1E1B] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#0E747E]" />
                <span>थोक मूल्य कैलकुलेटर (Wholesale Calculator)</span>
              </h3>
              <span className="text-xs font-bold text-[#0E747E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Live Pricing
              </span>
            </div>

            <form onSubmit={handleCreateNewEnquiry} className="space-y-4">
              {/* Select Product */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-600 block">शिल्प चुनें (Select Craft):</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D9C8B5] bg-[#FAF7F2] text-xs font-semibold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0E747E]"
                >
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {currentLanguage === 'hi' ? prod.titleHi : prod.titleEn} (₹{prod.pricing.recommendedRetailPrice})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Slider */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7DACB] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-600">
                    {currentLanguage === 'hi' ? 'थोक मात्रा:' : 'Wholesale Units:'}
                  </span>
                  <span className="text-base font-black text-[#0E747E]">
                    {calcQuantity} {currentLanguage === 'hi' ? 'इकाइयां' : 'units'}
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Number(e.target.value))}
                  className="w-full accent-[#0E747E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-medium">
                  <span>5 {currentLanguage === 'hi' ? 'इकाइयां' : 'units'}</span>
                  <span className="text-[#0E747E] font-bold">10-49 (16% Off)</span>
                  <span className="text-emerald-700 font-bold">50+ (26% Off)</span>
                </div>
              </div>

              {/* Live Price Calculation Summary Box */}
              <div className="p-4 rounded-xl bg-[#FAF5E6] border border-[#C69214]/40 space-y-2 text-xs">
                <div className="flex justify-between text-stone-700">
                  <span>{currentLanguage === 'hi' ? 'लागू थोक दर:' : 'Unit Rate:'}</span>
                  <span className="font-bold text-stone-900">
                    ₹{currentUnitRate.toLocaleString('en-IN')} / {currentLanguage === 'hi' ? 'इकाई' : 'unit'}
                  </span>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>{currentLanguage === 'hi' ? 'कुल थोक आर्डर मूल्य:' : 'Total Wholesale Quote:'}</span>
                  <span className="text-base font-extrabold text-[#8C2D19]">
                    ₹{totalWholesaleValue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-800 font-semibold pt-1 border-t border-[#C69214]/20">
                  <span>{currentLanguage === 'hi' ? 'कारीगरों को कुल सीधी मजदूरी:' : 'Direct Artisan Labor:'}</span>
                  <span className="font-bold">₹{totalArtisanDirectEarnings.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Buyer Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-0.5">
                    {currentLanguage === 'hi' ? 'आपका नाम:' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#D9C8B5] bg-[#FAF7F2] text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-stone-600 block mb-0.5">
                    {currentLanguage === 'hi' ? 'कंपनी / संगठन:' : 'Company / Organization:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerCompany}
                    onChange={(e) => setBuyerCompany(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#D9C8B5] bg-[#FAF7F2] text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-stone-600 block">
                  {currentLanguage === 'hi' ? 'विशेष आवश्यकताएं / नोट:' : 'Requirements / Notes:'}
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#D9C8B5] bg-[#FAF7F2] text-xs"
                />
              </div>

              {quoteSuccessMsg && (
                <div className="p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold text-center">
                  {quoteSuccessMsg}
                </div>
              )}

              <button
                id="submit-b2b-enquiry-btn"
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0E747E] hover:bg-[#0A5C64] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>थोक कोटेशन अनुरोध भेजें (Submit B2B Enquiry)</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right: Active Live Enquiries List for Artisan */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4D5C5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#1F1E1B]">
                  प्राप्त थोक व्यापार संदेश (Incoming Enquiries)
                </h3>
                <p className="text-xs text-stone-500">
                  होटल, निर्यातक और थोक खरीदारों के सक्रिय अनुरोध
                </p>
              </div>
              <span className="text-xs font-bold text-[#8C2D19] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                {enquiries.length} अनुरोध सक्रिय
              </span>
            </div>

            {enquiries.length === 0 ? (
              <div className="text-center py-10 text-stone-400 text-xs">
                कोई सक्रिय पूछताछ नहीं है।
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="p-4 rounded-xl border border-[#E7DACB] bg-[#FAF7F2] hover:bg-[#F8F4EC] transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-2.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={enquiry.productImage}
                          alt={enquiry.productTitle}
                          className="w-12 h-12 rounded-lg object-cover border border-[#D9C8B5]"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                            {enquiry.productTitle}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-stone-600">
                            <Building2 className="w-3.5 h-3.5 text-[#0E747E]" />
                            <span className="font-semibold">{enquiry.buyerCompany}</span>
                            <span>• {enquiry.buyerName}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Tag */}
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                          enquiry.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : enquiry.status === 'negotiating'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-teal-100 text-teal-800 border-teal-300'
                        }`}
                      >
                        {enquiry.status === 'accepted' ? 'स्वीकृत (Order Accepted)' :
                         enquiry.status === 'negotiating' ? 'बातचीत जारी (Negotiating)' : 'नया प्रस्ताव (Pending Review)'}
                      </span>
                    </div>

                    {/* Order Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-white p-3 rounded-lg border border-stone-200/70">
                      <div>
                        <span className="text-stone-500 block text-[10px]">मात्रा (Quantity):</span>
                        <span className="font-bold text-stone-900">{enquiry.quantityUnits} इकाइयां</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px]">प्रस्तावित दर:</span>
                        <span className="font-bold text-[#0E747E]">₹{enquiry.proposedPricePerUnit} / इकाई</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-stone-500 block text-[10px]">कुल आर्डर मूल्य:</span>
                        <span className="font-bold text-[#8C2D19]">
                          ₹{(enquiry.quantityUnits * enquiry.proposedPricePerUnit).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Message */}
                    <p className="text-xs text-stone-700 leading-relaxed italic bg-white/60 p-2.5 rounded border border-stone-200/50">
                      "{enquiry.message}"
                    </p>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        <span>{enquiry.buyerPhone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* WhatsApp Direct Connect */}
                        <a
                          href={generateWhatsAppLink(enquiry)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>व्हाट्सएप पर बात करें</span>
                        </a>

                        {/* Accept Button */}
                        {enquiry.status !== 'accepted' && (
                          <button
                            type="button"
                            onClick={() => onUpdateEnquiryStatus(enquiry.id, 'accepted', 'सहकारी समिति द्वारा आर्डर स्वीकृत किया गया।')}
                            className="px-3 py-1.5 rounded-lg bg-[#B84A28] hover:bg-[#9E3B1C] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>प्रस्ताव स्वीकार करें</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
